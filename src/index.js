import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Spring } from 'react-spring/renderprops'

const SegmentedRoundDisplay = ({ segments, arcWidth, emptyArcWidth, arcSpacing, totalArcSize, emptyColor, filledColor, radius, displayValue, style, animationDuration, animated }) => {
    const [arcs, setArcs] = useState([]);

    const totalArcs = segments.length;

    const totalSpaces = totalArcs - 1;
    const totalSpacing = totalSpaces * arcSpacing;

    const arcSize = (totalArcSize - totalSpacing) / totalArcs;
    const arcsStart = 90 - totalArcSize / 2;

    const margin = 10;
    const svgWidth = (radius + arcWidth) * 2;
    const svgHeight = (radius + arcWidth) * 2;

    const createArcs = useCallback(() => {
        const newArcs = segments.map((goal, index) => {
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

            newArc.filled = scaleValue(goal.filled, [0, goal.total], [newArc.start, newArc.end]);

            return newArc;
        });

        setArcs(newArcs);
    }, [segments, arcSize, arcSpacing, arcWidth, arcsStart, radius]);

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
    }, [segments, createArcs]);

    return (
        <svg width={svgWidth} height={svgHeight} style={style}>
            {arcs.map((arc, index) => (
                <g key={index.toString()}>
                    <path fill="none" stroke={emptyColor} strokeWidth={emptyArcWidth} strokeLinecap="round" d={drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.end)} />

                    {animated && (
                        <Spring from={{ x: arc.start, y: 0 }} to={{ x: arc.filled + 0.6, y: arcWidth }} config={{ duration: animationDuration / totalArcs, delay: animationDuration / totalArcs * index }}>
                            {props => (
                                <>
                                    {arc.filled > arc.start && (
                                        <path fill="none" stroke={filledColor} strokeWidth={props.y} strokeLinecap="round" d={drawArc(arc.centerX, arc.centerY, radius, arc.start, props.x)} />

                                    )}
                                </>
                            )}
                        </Spring>
                    )}

                    {!animated && (
                        <>
                            {arc.filled > arc.start && (
                                <path fill="none" stroke={filledColor} strokeWidth={arcWidth} strokeLinecap="round" d={drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.filled)} />

                            )}
                        </>
                    )}
                </g>
            ))}
            {displayValue !== '' && renderDisplayValue()}
        </svg>
    );
}

SegmentedRoundDisplay.propTypes = {
    segments: PropTypes.arrayOf(
        PropTypes.shape({
            total: PropTypes.number.isRequired,
            filled: PropTypes.number.isRequired
        })
    ),
    arcWidth: PropTypes.number,
    emptyArcWidth: PropTypes.number,
    arcSpacing: PropTypes.number,
    totalArcSize: PropTypes.number,
    radius: PropTypes.number,
    emptyColor: PropTypes.string,
    filledColor: PropTypes.string,
    formatAmount: PropTypes.func,
    style: PropTypes.object,
    animationDuration: PropTypes.number,
    animated: PropTypes.bool
}

SegmentedRoundDisplay.defaultProps = {
    segments: [],
    arcWidth: 7,
    emptyArcWidth: 7,
    arcSpacing: 7,
    totalArcSize: 280,
    radius: 150,
    emptyColor: 'grey',
    filledColor: 'green',
    animationDuration: 700,
    animated: true
}

export default SegmentedRoundDisplay;