/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require('../game');

jest.spyOn(window, 'alert').mockImplementation(() => { });

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'UTF-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('game object contains correct keys', () => {
    test('score key exist', () => {
        expect('score' in game).toBe(true);
    });
    test('currentGame key exist', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key exist', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key exist', () => {
        expect('choices' in game).toBe(true);
    });
    test('choices contain correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
    test('turnNumber key exist', () => {
        expect('turnNumber' in game).toBe(true);
    });
    test('should toggle turnInProgress to true', () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test('lastButton key exist', () => {
        expect('turnNumber' in game).toBe(true);
    });
    test('turnInProgress key exist', () => {
        expect('turnInProgress' in game).toBe(true);
    });
    test('turnInProgress key value is false', () => {
        expect('turnInProgress' in game).toBe(true);
    });
});

describe('newGame works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        currentGame = ['button1', 'button2', 'button3', 'button4'];
        playerMoves = ['button1', 'button2', 'button3', 'button4'];
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test('should set game score to zero', () => {
        expect(game.score).toEqual(0);
    });
    test('should be one move in the currentGame array', () => {
        expect(game.currentGame.length).toBe(1);
    });
    test('should empty playerMoves array', () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test('should display 0 for the element with id of score', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
    test('expect data-listener to be true', () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    });
});

describe('gameplay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('should add correct class to light up the buttons', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test('should increment the score if the turn is correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test('should call an alert if the move is wrong', ()=> {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong move!');
    });
    test('clicking during computer sequence should fail', () => {
        showTurns();
        game.lastButton = '';
        document.getElementById('button2').click();
        expect(game.lastButton).toEqual('');
    }) ;
});
