$(document).ready(function(){

	// AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
	$('.rubro_list .rubro_item[rubro="all"]').addClass('ct_item-active');

	// FILTRANDO PROFESIONALES=========================

	$('.rubro_item').click(function(){
		var catProduct = $(this).attr('rubro');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.rubro_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// EFECTO OCULTANDO PROFESIONALES =========================
		$('.profesional-item').css('transform', 'scale(0)');
		function ocultarProfesional(){
			$('.profesional-item').hide();
		} setTimeout(ocultarProfesional,400);

		// EFECTO MOSTRANDO PROFESIONALES =========================
		function mostrarProfesional(){
			$('.profesional-item[rubro="'+catProduct+'"]').show();
			$('.profesional-item[rubro="'+catProduct+'"]').css('transform', 'scale(1)');
		} setTimeout(mostrarProfesional,400);
	});

	// MOSTRANDO TODOS LOS PRODUCTOS =======================

	$('.rubro_item[rubro="all"]').click(function(){
		function mostrarTodos(){
			$('.profesional-item').show();
			$('.profesional-item').css('transform', 'scale(1)');
		} setTimeout(mostrarTodos,400);
	});
});