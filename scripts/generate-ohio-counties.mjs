/**
 * Fetches Ohio county GeoJSON and outputs SVG path data scaled to viewBox 0 0 420 390.
 * Run: node scripts/generate-ohio-counties.mjs
 */

// Ohio bounding box (approximate, with small padding)
const LON_MIN = -84.82;
const LON_MAX = -80.52;
const LAT_MIN = 38.40;
const LAT_MAX = 41.98;

const SVG_W = 420;
const SVG_H = 390;
const PADDING = 15;

function project(lon, lat) {
  const x = PADDING + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (SVG_W - PADDING * 2);
  // Latitude is inverted (north = top)
  const y = PADDING + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (SVG_H - PADDING * 2);
  return [x, y];
}

function coordsToPath(rings) {
  return rings
    .map((ring) =>
      ring
        .map(([lon, lat], i) => {
          const [x, y] = project(lon, lat);
          return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(' ') + ' Z'
    )
    .join(' ');
}

// Fetch from Census Bureau simplified county cartographic boundaries (2023, 500k scale)
const url =
  'https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json';

// Alternative: use a well-known Ohio counties GeoJSON
const ohioUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/OH-39-ohio-counties.json';

async function fetchOhioCounties() {
  console.error('Fetching Ohio county TopoJSON…');
  const res = await fetch(ohioUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const topo = await res.json();

  // Convert topojson to geojson manually (simple arc decoding)
  const { arcs, objects, transform } = topo;

  // Decode TopoJSON arcs
  function decodeArc(arcIndex) {
    const arc = arcIndex < 0 ? arcs[~arcIndex].slice().reverse() : arcs[arcIndex];
    let x = 0,
      y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      // Apply transform
      const lon = x * transform.scale[0] + transform.translate[0];
      const lat = y * transform.scale[1] + transform.translate[1];
      return [lon, lat];
    });
  }

  function topoGeomToGeoCoords(geom) {
    // geom.arcs is array of rings, each ring is array of arc indices
    if (geom.type === 'Polygon') {
      return geom.arcs.map((ring) => {
        const coords = [];
        for (const arcIdx of ring) {
          const pts = decodeArc(arcIdx);
          // Avoid duplicating the join point
          coords.push(...(coords.length ? pts.slice(1) : pts));
        }
        return coords;
      });
    } else if (geom.type === 'MultiPolygon') {
      return geom.arcs.flatMap((poly) =>
        poly.map((ring) => {
          const coords = [];
          for (const arcIdx of ring) {
            const pts = decodeArc(arcIdx);
            coords.push(...(coords.length ? pts.slice(1) : pts));
          }
          return coords;
        })
      );
    }
    return [];
  }

  const collection = objects[Object.keys(objects)[0]];
  const counties = collection.geometries;

  const paths = counties.map((geom) => {
    const rings = topoGeomToGeoCoords(geom);
    return {
      name: geom.properties.NAME || geom.properties.name || '',
      d: coordsToPath(rings),
    };
  });

  console.log(JSON.stringify(paths, null, 2));
}

fetchOhioCounties().catch((err) => {
  console.error(err);
  process.exit(1);
});
