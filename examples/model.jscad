
// Here we define the user editable parameters:
function getParameterDefinitions() {
  return [
    { name: 'cylRadius1', caption: 'Cylinder radius small:', type: 'float', default: 7 },
    { name: 'cylRadius2', caption: 'Cylinder radius big:', type: 'float', default: 8 },
    { name: 'cylLength1', caption: 'Cylinder length', type: 'float', default: 15 },
    { name: 'quality', caption: 'quality', type: 'int', default: 32 }
  ];
}

// Main entry point; here we construct our solid:
function main(params)
{
  // cone
  var cone = CSG.cylinder({
    start: [0, (-params.cylLength1 / 2.0), 0],
    end: [0, (params.cylLength1 / 2.0), 0],
    radiusStart: params.cylRadius1,
    radiusEnd: params.cylRadius2,
    resolution: params.quality
  }).setColor([0, 0.5, 0]);

  // begin sphere:
  var beginSphere = CSG.sphere({
    center: [0, 0, 0],
    radius: params.cylRadius1,
    resolution: params.quality
  })
  .setColor([0, 0.5, 0.5])
  .scale([1, 1.2, 1])
  .translate([0, (-params.cylLength1 / 2.0), 0]);

  // big sphere
  var endSphere = CSG.sphere({
    center: [0, 0, 0],
    radius: params.cylRadius2 - 0.1,
    resolution: params.quality
  })
  .translate([0, params.cylLength1, 0])
  .setColor([0.0, 0.1, 0.4]) // blue color
  .scale([1, 0.5, 1]);

  // cylinder for see inner space
  var cylinder = CSG.cylinder({
    start: [0, -params.cylLength1 * 2.0, 0],
    end: [0, params.cylLength1 * 2.0, 0],
    radius: params.cylRadius2,
    resolution: params.quality,
    sectorAngle: 20
  }).setColor([0.2, 1.4, 1.0]);

  var res = cone
          .union(beginSphere)
          .subtract(endSphere)
          .subtract(cylinder);

  return res;
}
