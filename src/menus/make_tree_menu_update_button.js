var recluster = require('../recluster/recluster');
var toggle_menu = require('./toggle_menu');

module.exports = function make_tree_menu_update_button(cgm, button_info){

  var update_button_width = 100;
  var menu_width = button_info.menu_width;
  var update_buton_x = menu_width/2 + button_info.default_x_offset;
  var update_buton_y = 205;

  var default_opacity = 0.35;
  var high_opacity = 0.5;

  var update_button = button_info.tree_menu
    .append('g')
    .classed('update_button', true)
    .attr('transform', 'translate('+ update_buton_x +', ' + update_buton_y + ')')
    .on('click', function(){

      toggle_menu(cgm, 'tree_menu', 'close');

      // transfer parameters to cgm object when update is pressed
      cgm.params.matrix.distance_metric = button_info.distance_metric;
      cgm.params.matrix.linkage_type = button_info.linkage_type;
      recluster(cgm, button_info.distance_metric, button_info.linkage_type);

    })
    .on('mouseover', function(){
      d3.select(this)
        .select('rect')
        .attr('opacity', high_opacity);
    })
    .on('mouseout', function(){
      d3.select(this)
        .select('rect')
        .attr('opacity', default_opacity);
    });

  update_button
    .append('rect')
    .attr('width', update_button_width + 'px')
    .attr('height', '35px')
    .attr('fill', 'blue')
    .attr('transform', 'translate(0, -23)')
    .attr('stroke', '#A3A3A3')
    .attr('stroke-width', '1px')
    .attr('opacity', default_opacity);

  update_button
    .append('text')
    .attr('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
    .attr('font-size','18px')
    .attr('font-weight', 500)
    .attr('cursor', 'default')
    .text('Update')
    .attr('transform', 'translate(18, 0)');

};