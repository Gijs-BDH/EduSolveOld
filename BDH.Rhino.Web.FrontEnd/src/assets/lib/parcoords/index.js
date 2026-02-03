import * as d3 from 'd3'
import ParCoords from 'parcoord-es/dist/parcoords.standalone'

export class ParCoordsPlotter{
    plot(data, defaultAxis, hiddenAxes, onBrush, eleId) {

        var min = Math.min(...data.map(i => i[defaultAxis])); 
        var max = Math.max(...data.map(i => i[defaultAxis]));
        // quantitative color scale
        var blue_to_brown = d3.scaleLinear()
            .domain([min, max])
            .range(["steelblue", "brown"])
            .interpolate(d3.interpolateLab);
    
        var color = function (d) {
            return blue_to_brown(d[defaultAxis]);
        };
    
        var parcoords = ParCoords()("#" + eleId)
            .color(color)
            .alpha(0.4)
            .on('render', () => {})
            .on('resize', () => {})
            .on('highlight', () => {})
            .on('brush', (d) => { onBrush(d) });
    
        parcoords
            .data(data)
            .alpha(0.2)
            .mode('queue')
            .hideAxis(hiddenAxes)
            .render()
            .reorderable()
            .brushMode("1D-axes");  // enable brushing
    }
    
}
