import chai from 'chai';
import colorsDiff from '../lib/colors-diff.js';

chai.expect();

const expect = chai.expect;

describe('Colors distance', function() {
    describe('Replace colors array is empty, without invert option', function() {
        it('should returns the first color.', function() {
            expect(colorsDiff('#FFFFFF', '#000000', 0, [], {}))
                .equal('#FFFFFF');
        });
    });

    describe('Replace colors array is empty, with invert option', function() {
        it('should returns the white color.', function() {
            expect(colorsDiff('#2c3e50', '#2c3e50', 0, [], {
                invertColor: true
            })).equal('#FFFFFF');
        });

        it('should returns the black color.', function() {
            expect(colorsDiff('#f1c40f', '#f1c40f', 0, [], {
                invertColor: true
            })).equal('#000000');
        });
    });

    describe('Colors are not in hex format.', function() {
        it('should returns the first parameter', function() {
            expect(colorsDiff('#FFFFF', '#000000', 0, [], {}))
                .equal('#FFFFFF');
        });
    });

    describe('Invert colors using rplColors array', function() {
        var rplColors = ['#2c3e50', '#ecf0f1'];
        var options = { invertColor: true };

        it('should returns the light color', function() {
            expect(colorsDiff('#000000', '#000000', 0, rplColors, options))
                .equal('#ecf0f1');
        });

        it('should returns the dark color', function() {
            expect(colorsDiff('#FFFFFF', '#FFFFFF', 0, rplColors, options))
                .equal('#2c3e50');
        });
    });

    describe('Find the farest color in array', function() {
        var arr = [
            '#1abc9c',
            '#27ae60',
            '#2980b9',
            '#8e44ad',
            '#2c3e50',
            '#f1c40f',
            '#e67e22',
            '#e74c3c',
            '#ecf0f1',
            '#bdc3c7',
            '#7f8c8d'
        ];

        it('should returns the farest color according to acptRatio', function() {
            expect(colorsDiff('#c0392b', '#d35400', 0.5, arr, {}))
                .equal('#ecf0f1');
        });

        it('should returns the first color of array', function() {
            expect(colorsDiff('#c0392b', '#d35400', 0.3, arr, {}))
                .equal('#1abc9c');
        });
    });

    describe('RGB format support.', function() {
        it('should returns the first parameter', function() {
            var white = 'rgb(255, 255, 255)';

            expect(colorsDiff(white, white, 0, [], {})).equal(white);
        });
    });
});
