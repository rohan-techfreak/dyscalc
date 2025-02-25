import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import GameContext from "./GameContext";
import { ACTION_TYPE } from "../enums";

const GameState = ({ total, children }) => {
    const [current, setCurrent] = useState({ idx: null, value: null });

    const { state, dispatch } = useContext(GameContext);
    const { score } = state;

    const setScore = newScore => {
        dispatch({
            type: ACTION_TYPE.CHANGE_SCORE,
            payload: {
                data: newScore,
            },
        });
    };

    const onCorrect = () => setScore(score - 1);
    const onIncorrect = () => setScore(score + 1);
    const onReset = () => setScore(total);

    return (
        <>
            {score === 0 ? (
                <p className="text-white bg-dark text-center">Game Completed!</p>
            ) : null}
            {children({ current, onCorrect, onIncorrect, onReset, setCurrent })}
        </>
    );
};

GameState.propTypes = {
    total: PropTypes.number.isRequired,
    children: PropTypes.func.isRequired,
};

export default GameState;
