import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Spring } from 'react-spring/renderprops'

const SegmentedRoundDisplay = ({
    segments,
    filledArcWidth,
    emptyArcWidth,
    arcSpacing,
    totalArcSize,
    emptyArcColor,
    filledArcColor,
    radius,
    style,
    animationDuration,
    animated,
    formatValue,
    incompleteArcColor,
    displayValue,
    valueBoxColor,
    valueFontColor
}) => {

    const [arcs, setArcs] = useState([]);

    const totalArcs = segments.length;

    const totalSpaces = totalArcs - 1;
    const totalSpacing = totalSpaces * arcSpacing;

    const arcSize = (totalArcSize - totalSpacing) / totalArcs;
    const arcsStart = 90 - totalArcSize / 2;

    const margin = 35;
    const svgWidth = (radius + filledArcWidth) * 2 + (2 * margin);
    const svgHeight = (radius + filledArcWidth) * 2 + (2 * margin);

    const totalFilledValue = segments.reduce((acc, actual) => acc + actual.filled, 0);

    const createArcs = useCallback(() => {
        const newArcs = segments.map((goal, index) => {
            const newArc = {
                centerX: radius + filledArcWidth + margin,
                centerY: radius + filledArcWidth + margin,
                start: arcsStart + (index * arcSize),
                end: arcsStart + arcSize + (index * arcSize),
                isComplete: goal.total == goal.filled
            }

            if (index !== 0) {
                newArc.start += arcSpacing * index;
                newArc.end += arcSpacing * index;
            }

            newArc.filled = scaleValue(goal.filled, [0, goal.total], [newArc.start, newArc.end]);

            return newArc;
        });

        setArcs(newArcs);
    }, [segments, arcSize, arcSpacing, filledArcWidth, arcsStart, radius]);

    const renderDisplayValue = (angle, value) => {
        const arc = arcs[arcs.length - 1];

        if (!arc) {
            return <g></g>
        }

        const pos = polarToCartesian(arc.centerX, arc.centerY, radius, (angle || arc.filled) + 3);

        const boxFinalPosition = {
            x: pos.x - 40,
            y: pos.y + 6
        }

        const formatedValue = formatValue ? formatValue(value || totalFilledValue) : parseInt(value || totalFilledValue);

        return (
            <g>
                <rect x={boxFinalPosition.x} y={boxFinalPosition.y} width="80" height="25" fill={valueBoxColor} rx={3} />
                <rect width="10" height="10" fill={valueBoxColor} transform={`translate(${pos.x},${pos.y}) rotate(45)`} rx={2} />
                <text x={pos.x} font-weight="bold" fontSize={14} y={boxFinalPosition.y + 18} fill={valueFontColor} text-anchor="middle">{formatedValue}</text>
            </g>
        )
    }

    useEffect(() => {
        createArcs();
    }, [segments, createArcs]);

    if (arcs.length == 0) {
        return <></>;
    }

    return (
        <svg width={svgWidth} height={svgHeight} style={style}>
            {arcs.map((arc, index) => (
                <g key={index.toString()}>
                    <path fill="none" stroke={emptyArcColor} strokeWidth={emptyArcWidth} strokeLinecap="round" d={drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.end)} />

                    {animated && arc.filled > arc.start && (
                        <Spring from={{ x: arc.start, y: 0 }} to={{ x: arc.filled + 0.6, y: filledArcWidth }} config={{ duration: animationDuration / totalArcs, delay: animationDuration / totalArcs * index }}>
                            {props => (<path fill="none" stroke={arc.isComplete ? filledArcColor : incompleteArcColor || filledArcColor} strokeWidth={props.y} strokeLinecap="round" d={drawArc(arc.centerX, arc.centerY, radius, arc.start, props.x)} />)}
                        </Spring>
                    )}

                    {!animated && arc.filled > arc.start && (
                        <path fill="none" stroke={arc.isComplete ? filledArcColor : incompleteArcColor || filledArcColor} strokeWidth={filledArcWidth} strokeLinecap="round" d={drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.filled)} />
                    )}
                </g>
            ))}

            {displayValue && (
                <g>
                    {!animated && (
                        renderDisplayValue()
                    )}

                    {animated && (
                        <Spring from={{ x: arcsStart, value: 0 }} to={{ x: arcs[arcs.length - 1].filled, value: totalFilledValue }} config={{ duration: animationDuration }}>
                            {props => renderDisplayValue(props.x, props.value)}
                        </Spring>
                    )}
                </g>
            )}
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
    filledArcWidth: PropTypes.number,
    emptyArcWidth: PropTypes.number,
    arcSpacing: PropTypes.number,
    totalArcSize: PropTypes.number,
    radius: PropTypes.number,
    emptyArcColor: PropTypes.string,
    filledArcColor: PropTypes.string,
    formatAmount: PropTypes.func,
    style: PropTypes.object,
    animationDuration: PropTypes.number,
    animated: PropTypes.bool,
    formatValue: PropTypes.func,
    incompleteArcColor: PropTypes.string,
    displayValue: PropTypes.bool,
    valueBoxColor: PropTypes.string,
    valueFontColor: PropTypes.string
}

SegmentedRoundDisplay.defaultProps = {
    segments: [],
    filledArcWidth: 7,
    emptyArcWidth: 7,
    arcSpacing: 7,
    totalArcSize: 280,
    radius: 150,
    emptyArcColor: '#ADB1CC',
    filledArcColor: '#5ECCAA',
    animationDuration: 1000,
    animated: true,
    incompleteArcColor: '#23318C',
    displayValue: false,
    valueBoxColor: '#23318C',
    valueFontColor: '#FFFFFF'
}

export default SegmentedRoundDisplay;