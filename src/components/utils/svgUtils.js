const CENTER_X = 100;
const CENTER_Y = 100;
const RADIUS = 90;

function getCoords(angle, radius = RADIUS)
{
    const rad = (angle - 90) * Math.PI / 180;
    return {
        x: CENTER_X + radius * Math.cos(rad),
        y: CENTER_Y + radius * Math.sin(rad),
    };
}

function describeArc(startAngle, endAngle,radius, arcWidth)
{
    const innerRadius =radius - arcWidth / 2;
    const outerRadius = radius - arcWidth / 2;

    const startOuter = getCoords(startAngle, outerRadius)
    const endOuter = getCoords(endAngle, outerRadius);
    const startInner = getCoords(endAngle, innerRadius);
    const endInner = getCoords(startAngle, innerRadius);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        `M ${startOuter.x} ${startOuter.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
        `L ${startInner.x} ${startInner.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${endInner.x} ${endInner.y}`,
        `Z`
    ].join(" ");
}

export {getCoords, describeArc};