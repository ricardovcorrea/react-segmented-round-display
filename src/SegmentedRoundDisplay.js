import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const SegmentedRoundDisplay = ({ goals, arcWidth, arcSpacing, totalArcSize, emptyColor, filledColor, radius, displayValue, style }) => {
    const [arcs, setArcs] = useState([]);

    const totalArcs = goals.length;

    const totalSpaces = totalArcs - 1;
    const totalSpacing = totalSpaces * arcSpacing;

    const arcSize = (totalArcSize - totalSpacing) / totalArcs;
    const arcsStart = 90 - totalArcSize / 2;

    const margin = 10;
    const svgWidth = (radius + arcWidth) * 2;
    const svgHeight = (radius + arcWidth) * 2;

    const createArcs = useCallback(() => {
        const newArcs = goals.map((goal, index) => {
            const newArc = {
                centerX: radius + arcWidth,
                centerY: radius + arcWidth,
                start: arcsStart + (index * arcSize),
                end: arcsStart + arcSize + (index * arcSize)
            }

            if (index !== 0) {
                newArc.start += arcSpacing * index;
                newArc.end += arcSpacing * index;
            }

            newArc.filled = goal.done ? newArc.end : scaleValue(goal.spent, [0, goal.total], [newArc.start, newArc.end]);

            return newArc;
        });

        setArcs(newArcs);
    }, [goals, arcSize, arcSpacing, arcWidth, arcsStart, radius]);

    const renderDisplayValue = () => {
        const arc = arcs[arcs.length - 1];

        if (!arc) {
            return <></>
        }

        const pos = polarToCartesian(arc.centerX, arc.centerY, radius, arc.filled);

        return (
            <text x={pos.x} y={pos.y} fill="red">{displayValue}</text>
        )
    }

    useEffect(() => {
        createArcs();
    }, [goals, createArcs]);

    return (
        <svg width={svgWidth} height={svgHeight} style={style}>
            {arcs.map((arc, index) => (
                <g key={index.toString()}>
                    <path fill="none" stroke={emptyColor} strokeWidth={arcWidth} strokeLinecap="round" d={drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.end)} />

                    {arc.filled > arc.start && (
                        <path fill="none" stroke={filledColor} strokeWidth={arcWidth} strokeLinecap="round" d={drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.filled)} />
                    )}
                </g>
            ))}
            {displayValue !== '' && renderDisplayValue()}
        </svg>
    );
}

SegmentedRoundDisplay.propTypes = {
    goals: PropTypes.arrayOf(
        PropTypes.shape({
            done: PropTypes.bool,
            total: PropTypes.number,
            spent: PropTypes.number
        })
    ),
    arcWidth: PropTypes.number,
    arcSpacing: PropTypes.number,
    totalArcSize: PropTypes.number,
    radius: PropTypes.number,
    emptyColor: PropTypes.string,
    filledColor: PropTypes.string,
    formatAmount: PropTypes.func,
    style: PropTypes.object,
}

SegmentedRoundDisplay.defaultProps = {
    goals: [],
    arcWidth: 7,
    arcSpacing: 7,
    totalArcSize: 280,
    radius: 150,
    emptyColor: 'grey',
    filledColor: 'green'
}

export default SegmentedRoundDisplay;

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    }
}

const drawArc = (x, y, radius, startAngle, endAngle) => {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

const scaleValue = (value, from, to) => {
    var scale = (to[1] - to[0]) / (from[1] - from[0]);
    var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    return ~~(capped * scale + to[0]);
}