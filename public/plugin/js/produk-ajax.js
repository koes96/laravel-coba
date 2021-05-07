
	//CRUD Dropdown Produk
    var save_method_produk; //for save method string
	var table_produk;

	function produk_ajax() {
		if($('#tableprodukdropdown').length){
			datatable_produk();
		} else if ($('#tablependidikandropdown').length) {
			datatable_pendidikan();
		} else if ($('#tabletipependapatandropdown').length) {
			datatable_tipe_pendapatan();
		} else if ($('#tablebidangusahadropdown').length) {
			datatable_bidang_usaha();
		} else if ($('#tablestatussuratmasukdropdown').length) {
			datatable_status_surat_masuk();
		} else if ($('#tablekatlib').length) {
			datatable_kat_lib();
		} else if ($('#tablekegkhazanah').length) {
			datatable_keg_khazanah();
		} else if ($('#tabletujuankhazanah').length) {
			datatable_tujuan_khazanah();
		} else if ($('#tablejamkhazanah').length) {
			datatable_jam_khazanah();
		} else if ($('#tablemenu').length) {
			datatable_menu();
		} else if ($('#tablesubmenu').length) {
			datatable_sub_menu();
		} else if ($('#tableaccessmenu').length) {
			datatable_access_menu();
		} else {
			return;
		}

		
	};

	function datatable_produk()
	{
		//datatables Produk
		table_produk = $('#tableprodukdropdown').DataTable({

			"processing": true, //Feature control the processing indicator.
			"serverSide": true, //Feature control DataTables' server-side processing mode.
			"order": [], //Initial no order.

			// Load data for the table's content from an Ajax source
			"ajax": {
				"url": "Produk/ajax_list",
				"type": "POST"
			},

			//Set column definition initialisation properties.
			"columnDefs": [{
				"targets": [-1], //last column
				"orderable": false, //set not orderable
			}, ],

		});

		//set input/textarea/select event when change value, remove class error and remove text help block 
		$("input").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("textarea").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("select").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
	}

	function produk_add_ajax() {
		save_method_produk = 'add';
		$('#formproduk')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		$('#modal_form').modal('show'); // show bootstrap modal
		$('.modal-title').text('Add Produk'); // Set Title to Bootstrap modal title
		$('#btnSaveProduk').text('save'); //change button text
		$('#btnSaveProduk').attr('disabled', false); //set button enable 
	}

	function produk_edit_ajax(iddropdownproduk) {
		save_method_produk = 'update';
		$('#formproduk')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		//Ajax Load data from ajax
		$.ajax({
			url: "Produk/ajax_edit/" + iddropdownproduk,
			type: "GET",
			dataType: "JSON",
			success: function(data) {

				$('[name="iddropdownproduk"]').val(data.id_dropdown_produk);
				$('[name="namadropdownproduk"]').val(data.nama_dropdown_produk);
				$('[name="kodedropdownproduk"]').val(data.kode_dropdown_produk);
				//$('[name="dob"]').datepicker('update',data.dob);
				$('#modal_form').modal('show'); // show bootstrap modal when complete loaded
				$('.modal-title').text('Edit Produk'); // Set title to Bootstrap modal title

			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error get data from ajax');
			}
		});
	}

	function produk_reload_table() {
		table_produk.ajax.reload(null, false); //reload datatable ajax 
	}

	function produk_save() {
		$('#btnSaveProduk').text('saving...'); //change button text
		$('#btnSaveProduk').attr('disabled', true); //set button disable 
		var url;

		if (save_method_produk == 'add') {
			url = "Produk/ajax_add";
		} else {
			url = "Produk/ajax_update";
		}
		var form = document.forms.namedItem('formdata');
		var form_data = new FormData(form);

		$.ajax({
			url: url,
			type: "POST",
			data: form_data,
			dataType: "JSON",
			contentType: false,
			processData: false,
			cache: false,
			success: function(data) {

				if (data.status) //if success close modal and reload ajax table
				{
					$('#btnSaveProduk').text('save'); //change button text
					$('#btnSaveProduk').attr('disabled', false); //set button enable 
					$('#modal_form').modal('hide');
					$('#formproduk')[0].reset();
					produk_reload_table();
				} else {
					for (var i = 0; i < data.inputerror.length; i++) {
						$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
						$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
					}
					$('#btnSaveProduk').text('save'); //change button text
					$('#btnSaveProduk').attr('disabled', false); //set button enable 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error adding / update data');
				$('#btnSaveProduk').text('save'); //change button text
				$('#btnSaveProduk').attr('disabled', false); //set button enable 

			}
		});
	}

	function delete_produk(iddropdownproduk) {
		if (confirm('Are you sure delete this data?')) {
			// ajax delete data to database
			$.ajax({
				url: "Produk/ajax_delete/" + iddropdownproduk,
				type: "POST",
				dataType: "JSON",
				success: function(data) {
					//if success reload ajax table
					$('#modal_form').modal('hide');
					produk_reload_table();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Error deleting data');
				}
			});

		}
	}
	//Ajax Data Pendidikan Terakhir
	
	//CRUD Dropdown Pendidikan
    var save_method_pendidikan; //for save method string
	var table_pendidikan;

	function datatable_pendidikan()
	{
		//datatables Pendidikan
		table_pendidikan = $('#tablependidikandropdown').DataTable({

			"processing": true, //Feature control the processing indicator.
			"serverSide": true, //Feature control DataTables' server-side processing mode.
			"order": [], //Initial no order.

			// Load data for the table's content from an Ajax source
			"ajax": {
				"url": "ajax_list_pendidikan",
				"type": "POST"
			},

			//Set column definition initialisation properties.
			"columnDefs": [{
				"targets": [-1], //last column
				"orderable": false, //set not orderable
			}, ],

		});

		//set input/textarea/select event when change value, remove class error and remove text help block 
		$("input").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("textarea").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("select").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
	}

	function pendidikan_add_ajax() {
		save_method_pendidikan = 'add';
		$('#formpendidikan')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		$('#pendidikan_modal_form').modal('show'); // show bootstrap modal
		$('.modal-title').text('Add Produk'); // Set Title to Bootstrap modal title
		$('#btnSavependidikan').text('save'); //change button text
		$('#btnSavependididkan').attr('disabled', false); //set button enable 
	}

	function pendidikan_edit_ajax(iddropdownpendidikan) {
		save_method_pendidikan = 'update';
		$('#formpendidikan')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		//Ajax Load data from ajax
		$.ajax({
			url: "ajax_edit_pendidikan/" + iddropdownpendidikan,
			type: "GET",
			dataType: "JSON",
			success: function(data) {

				$('[name="iddropdownpendidikan"]').val(data.id_dropdown_pendidikan);
				$('[name="namadropdownpendidikan"]').val(data.nama_dropdown_pendidikan);
				//$('[name="dob"]').datepicker('update',data.dob);
				$('#pendidikan_modal_form').modal('show'); // show bootstrap modal when complete loaded
				$('.modal-title').text('Edit Pendidikan'); // Set title to Bootstrap modal title

			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error get data from ajax');
			}
		});
	}

	function pendidikan_reload_table() {
		table_pendidikan.ajax.reload(null, false); //reload datatable ajax 
	}

	function pendidikan_save() {
		$('#btnSavependidikan').text('saving...'); //change button text
		$('#btnSavependidikan').attr('disabled', true); //set button disable 
		var url;

		if (save_method_pendidikan == 'add') {
			url = "ajax_add_pendidikan";
		} else {
			url = "ajax_update_pendidikan";
		}
		var form = document.forms.namedItem('formdata');
		var form_data = new FormData(form);

		$.ajax({
			url: url,
			type: "POST",
			data: form_data,
			dataType: "JSON",
			contentType: false,
			processData: false,
			cache: false,
			success: function(data) {

				if (data.status) //if success close modal and reload ajax table
				{
					$('#btnSavependidikan').text('save'); //change button text
					$('#btnSavependidikan').attr('disabled', false); //set button enable 
					$('#pendidikan_modal_form').modal('hide');
					$('#formpendidikan')[0].reset();
					pendidikan_reload_table();
				} else {
					for (var i = 0; i < data.inputerror.length; i++) {
						$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
						$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
					}
					$('#btnSavependidikan').text('save'); //change button text
					$('#btnSavependidikan').attr('disabled', false); //set button enable 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error adding / update data');
				$('#btnSavependidikan').text('save'); //change button text
				$('#btnSavependidikan').attr('disabled', false); //set button enable 

			}
		});
	}

	function delete_pendidikan(iddropdownpendidikan) {
		if (confirm('Are you sure delete this data?')) {
			// ajax delete data to database
			$.ajax({
				url: "ajax_delete_pendidikan/" + iddropdownpendidikan,
				type: "POST",
				dataType: "JSON",
				success: function(data) {
					//if success reload ajax table
					$('#pendidikan_modal_form').modal('hide');
					pendidikan_reload_table();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Error deleting data');
				}
			});

		}
	}

	//CRUD Dropdown Tipe Pendapatan
    var save_method_tipe_pendapatan; //for save method string
	var table_tipe_pendapatan;

	function datatable_tipe_pendapatan()
	{
		//datatables Pendidikan
		table_tipe_pendapatan = $('#tabletipependapatandropdown').DataTable({

			"processing": true, //Feature control the processing indicator.
			"serverSide": true, //Feature control DataTables' server-side processing mode.
			"order": [], //Initial no order.

			// Load data for the table's content from an Ajax source
			"ajax": {
				"url": "ajax_list_tipe_pendapatan",
				"type": "POST"
			},

			//Set column definition initialisation properties.
			"columnDefs": [{
				"targets": [-1], //last column
				"orderable": false, //set not orderable
			}, ],

		});

		//set input/textarea/select event when change value, remove class error and remove text help block 
		$("input").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("textarea").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("select").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
	}

	function tipe_pendapatan_add_ajax() {
		save_method_tipe_pendapatan = 'add';
		$('#formtipependapatan')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		$('#tipe_pendapatan_modal_form').modal('show'); // show bootstrap modal
		$('.modal-title').text('Add Produk'); // Set Title to Bootstrap modal title
		$('#btnSavetipependapatan').text('save'); //change button text
		$('#btnSavetipependapatan').attr('disabled', false); //set button enable 
	}

	function tipe_pendapatan_edit_ajax(iddropdownpekerjaan) {
		save_method_tipe_pendapatan = 'update';
		$('#formtipependapatan')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		//Ajax Load data from ajax
		$.ajax({
			url: "ajax_edit_tipe_pendapatan/" + iddropdownpekerjaan,
			type: "GET",
			dataType: "JSON",
			success: function(data) {

				$('[name="iddropdownpekerjaan"]').val(data.id_dropdown_pekerjaan);
				$('[name="namadropdownpekerjaan"]').val(data.nama_dropdown_pekerjaan);
				//$('[name="dob"]').datepicker('update',data.dob);
				$('#tipe_pendapatan_modal_form').modal('show'); // show bootstrap modal when complete loaded
				$('.modal-title').text('Edit Pendidikan'); // Set title to Bootstrap modal title

			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error get data from ajax');
			}
		});
	}

	function tipe_pendapatan_reload_table() {
		table_tipe_pendapatan.ajax.reload(null, false); //reload datatable ajax 
	}

	function tipe_pendapatan_save() {
		$('#btnSavepekerjaan').text('saving...'); //change button text
		$('#btnSavepekerjaan').attr('disabled', true); //set button disable 
		var url;

		if (save_method_tipe_pendapatan == 'add') {
			url = "ajax_add_tipe_pendapatan";
		} else {
			url = "ajax_update_tipe_pendapatan";
		}
		var form = document.forms.namedItem('formdata');
		var form_data = new FormData(form);

		$.ajax({
			url: url,
			type: "POST",
			data: form_data,
			dataType: "JSON",
			contentType: false,
			processData: false,
			cache: false,
			success: function(data) {

				if (data.status) //if success close modal and reload ajax table
				{
					$('#btnSavepekerjaan').text('save'); //change button text
					$('#btnSavepekerjaan').attr('disabled', false); //set button enable 
					$('#tipe_pendapatan_modal_form').modal('hide');
					$('#formtipependapatan')[0].reset();
					tipe_pendapatan_reload_table();
				} else {
					for (var i = 0; i < data.inputerror.length; i++) {
						$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
						$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
					}
					$('#btnSavepekerjaan').text('save'); //change button text
					$('#btnSavepekerjaan').attr('disabled', false); //set button enable 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error adding / update data');
				$('#btnSavepekerjaan').text('save'); //change button text
				$('#btnSavepekerjaan').attr('disabled', false); //set button enable 

			}
		});
	}

	function delete_tipe_pendapatan(iddropdownpekerjaan) {
		if (confirm('Are you sure delete this data?')) {
			// ajax delete data to database
			$.ajax({
				url: "ajax_delete_tipe_pendapatan/" + iddropdownpekerjaan,
				type: "POST",
				dataType: "JSON",
				success: function(data) {
					//if success reload ajax table
					$('#tipe_pendapatan_modal_form').modal('hide');
					tipe_pendapatan_reload_table();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Error deleting data');
				}
			});

		}
	}

	//CRUD Bidang Usaha
	var save_method_bidang_usaha; //for save method string
	var table_bidang_usaha;

	function datatable_bidang_usaha()
	{
		//datatables Pendidikan
		table_bidang_usaha = $('#tablebidangusahadropdown').DataTable({

			"processing": true, //Feature control the processing indicator.
			"serverSide": true, //Feature control DataTables' server-side processing mode.
			"order": [], //Initial no order.

			// Load data for the table's content from an Ajax source
			"ajax": {
				"url": "ajax_list_bidang_usaha",
				"type": "POST"
			},

			//Set column definition initialisation properties.
			"columnDefs": [{
				"targets": [-1], //last column
				"orderable": false, //set not orderable
			}, ],

		});

		//set input/textarea/select event when change value, remove class error and remove text help block 
		$("input").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("textarea").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("select").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
	}

	function bidang_usaha_add_ajax() {
		save_method_bidang_usaha = 'add';
		$('#formbidangusaha')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		$('#bidang_usaha_modal_form').modal('show'); // show bootstrap modal
		$('.modal-title').text('Add Bidang Usaha'); // Set Title to Bootstrap modal title
		$('#btnSavebidangusaha').text('save'); //change button text
		$('#btnSavebidangusaha').attr('disabled', false); //set button enable 
	}

	function bidang_usaha_edit_ajax(iddropdownbidangusaha) {
		save_method_bidang_usaha = 'update';
		$('#formbidangusaha')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		//Ajax Load data from ajax
		$.ajax({
			url: "ajax_edit_bidang_usaha/" + iddropdownbidangusaha,
			type: "GET",
			dataType: "JSON",
			success: function(data) {

				$('[name="iddropdownbidangusaha"]').val(data.id_dropdown_bidangusaha);
				$('[name="namadropdownbidangusaha"]').val(data.nama_dropdown_bidangusaha);
				//$('[name="dob"]').datepicker('update',data.dob);
				$('#bidang_usaha_modal_form').modal('show'); // show bootstrap modal when complete loaded
				$('.modal-title').text('Edit Bidang Usaha'); // Set title to Bootstrap modal title

			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error get data from ajax');
			}
		});
	}

	function bidang_usaha_reload_table() {
		table_bidang_usaha.ajax.reload(null, false); //reload datatable ajax 
	}

	function bidang_usaha_save() {
		$('#btnSavebidangusaha').text('saving...'); //change button text
		$('#btnSavebidangusaha').attr('disabled', true); //set button disable 
		var url;

		if (save_method_bidang_usaha == 'add') {
			url = "ajax_add_bidang_usaha";
		} else {
			url = "ajax_update_bidang_usaha";
		}
		var form = document.forms.namedItem('formdata');
		var form_data = new FormData(form);

		$.ajax({
			url: url,
			type: "POST",
			data: form_data,
			dataType: "JSON",
			contentType: false,
			processData: false,
			cache: false,
			success: function(data) {

				if (data.status) //if success close modal and reload ajax table
				{
					$('#btnSavebidangusaha').text('save'); //change button text
					$('#btnSavebidangusaha').attr('disabled', false); //set button enable 
					$('#bidang_usaha_modal_form').modal('hide');
					$('#formbidangusaha')[0].reset();
					bidang_usaha_reload_table();
				} else {
					for (var i = 0; i < data.inputerror.length; i++) {
						$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
						$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
					}
					$('#btnSavebidangusaha').text('save'); //change button text
					$('#btnSavebidangusaha').attr('disabled', false); //set button enable 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error adding / update data');
				$('#btnSavebidangusaha').text('save'); //change button text
				$('#btnSavebidangusaha').attr('disabled', false); //set button enable 

			}
		});
	}

	function delete_bidang_usaha(iddropdownbidangusaha) {
		if (confirm('Are you sure delete this data?')) {
			// ajax delete data to database
			$.ajax({
				url: "ajax_delete_bidang_usaha/" + iddropdownbidangusaha,
				type: "POST",
				dataType: "JSON",
				success: function(data) {
					//if success reload ajax table
					$('#bidang_usaha_modal_form').modal('hide');
					bidang_usaha_reload_table();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Error deleting data');
				}
			});

		}
	}
	//CRUD Surat Masuk
	var save_method_status_surat_masuk; //for save method string
	var table_status_surat_masuk;

	function datatable_status_surat_masuk()
	{
		//datatables Pendidikan
		table_status_surat_masuk = $('#tablestatussuratmasukdropdown').DataTable({

			"processing": true, //Feature control the processing indicator.
			"serverSide": true, //Feature control DataTables' server-side processing mode.
			"order": [], //Initial no order.

			// Load data for the table's content from an Ajax source
			"ajax": {
				"url": "ajax_list_status_surat_masuk",
				"type": "POST"
			},

			//Set column definition initialisation properties.
			"columnDefs": [{
				"targets": [-1], //last column
				"orderable": false, //set not orderable
			}, ],

		});

		//set input/textarea/select event when change value, remove class error and remove text help block 
		$("input").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("textarea").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("select").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
	}

	function status_surat_masuk_add_ajax() {
		save_method_status_surat_masuk = 'add';
		$('#formstatussuratmasuk')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		$('#statussuratmasuk_modal_form').modal('show'); // show bootstrap modal
		$('.modal-title').text('Add Bidang Usaha'); // Set Title to Bootstrap modal title
		$('#btnSavestatussuratmasuk').text('save'); //change button text
		$('#btnSavestatussuratmasuk').attr('disabled', false); //set button enable 
	}

	function status_surat_masuk_edit_ajax(iddropdownstatussuratmasuk) {
		save_method_status_surat_masuk = 'update';
		$('#formstatussuratmasuk')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		//Ajax Load data from ajax
		$.ajax({
			url: "ajax_edit_status_surat_masuk/" + iddropdownstatussuratmasuk,
			type: "GET",
			dataType: "JSON",
			success: function(data) {

				$('[name="iddropdownstatussuratmasuk"]').val(data.id_dropdown_statussuratmasuk);
				$('[name="namadropdownstatussuratmasuk"]').val(data.nama_dropdown_statussuratmasuk);
				//$('[name="dob"]').datepicker('update',data.dob);
				$('#status_surat_masuk_modal_form').modal('show'); // show bootstrap modal when complete loaded
				$('.modal-title').text('Edit Bidang Usaha'); // Set title to Bootstrap modal title

			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error get data from ajax');
			}
		});
	}

	function status_surat_masuk_reload_table() {
		table_status_surat_masuk.ajax.reload(null, false); //reload datatable ajax 
	}

	function status_surat_masuk_save() {
		$('#btnSavestatussuratmasuk').text('saving...'); //change button text
		$('#btnSavestatussuratmasuk').attr('disabled', true); //set button disable 
		var url;

		if (save_method_status_surat_masuk == 'add') {
			url = "ajax_add_status_surat_masuk";
		} else {
			url = "ajax_update_status_surat_masuk";
		}
		var form = document.forms.namedItem('formdata');
		var form_data = new FormData(form);

		$.ajax({
			url: url,
			type: "POST",
			data: form_data,
			dataType: "JSON",
			contentType: false,
			processData: false,
			cache: false,
			success: function(data) {

				if (data.status) //if success close modal and reload ajax table
				{
					$('#btnSavestatussuratmasuk').text('save'); //change button text
					$('#btnSavestatussuratmasuk').attr('disabled', false); //set button enable 
					$('#status_surat_masuk_modal_form').modal('hide');
					$('#formstatussuratmasuk')[0].reset();
					status_surat_masuk_reload_table();
				} else {
					for (var i = 0; i < data.inputerror.length; i++) {
						$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
						$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
					}
					$('#btnSavestatussuratmasuk').text('save'); //change button text
					$('#btnSavestatussuratmasuk').attr('disabled', false); //set button enable 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error adding / update data');
				$('#btnSavestatussuratmasuk').text('save'); //change button text
				$('#btnSavestatussuratmasuk').attr('disabled', false); //set button enable 

			}
		});
	}

	function delete_status_surat_masuk(iddropdownstatussuratmasuk) {
		if (confirm('Are you sure delete this data?')) {
			// ajax delete data to database
			$.ajax({
				url: "ajax_delete_status_surat_masuk/" + iddropdownstatussuratmasuk,
				type: "POST",
				dataType: "JSON",
				success: function(data) {
					//if success reload ajax table
					$('#status_surat_masuk_modal_form').modal('hide');
					status_surat_masuk_reload_table();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Error deleting data');
				}
			});

		}
	}
	//CRUD Kategori E-Library
	var save_method_kat_lib; //for save method string
	var table_kat_lib;

	function datatable_kat_lib()
	{
		//datatables Pendidikan
		table_kat_lib = $('#tablekatlib').DataTable({

			"processing": true, //Feature control the processing indicator.
			"serverSide": true, //Feature control DataTables' server-side processing mode.
			"order": [], //Initial no order.

			// Load data for the table's content from an Ajax source
			"ajax": {
				"url": "ajax_list_kat_lib",
				"type": "POST"
			},

			//Set column definition initialisation properties.
			"columnDefs": [{
				"targets": [-1], //last column
				"orderable": false, //set not orderable
			}, ],

		});

		//set input/textarea/select event when change value, remove class error and remove text help block 
		$("input").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("textarea").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
		$("select").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
	}

	function kat_lib_add_ajax() {
		save_method_kat_lib = 'add';
		$('#formkatlib')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		$('#katlib_modal_form').modal('show'); // show bootstrap modal
		$('.modal-title').text('Add Bidang Usaha'); // Set Title to Bootstrap modal title
		$('#btnSavekatlib').text('save'); //change button text
		$('#btnSavekatlib').attr('disabled', false); //set button enable 
	}

	function kat_lib_edit_ajax(idkatbook) {
		save_method_kat_lib = 'update';
		$('#formkatlib')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		//Ajax Load data from ajax
		$.ajax({
			url: "ajax_edit_kat_lib/" + idkatbook,
			type: "GET",
			dataType: "JSON",
			success: function(data) {

				$('[name="idkatbook"]').val(data.id_kat_book);
				$('[name="namakatbook"]').val(data.nama_kat_book);
				//$('[name="dob"]').datepicker('update',data.dob);
				$('#kat_lib_modal_form').modal('show'); // show bootstrap modal when complete loaded
				$('.modal-title').text('Edit Kategori E-Library'); // Set title to Bootstrap modal title

			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error get data from ajax');
			}
		});
	}

	function kat_lib_reload_table() {
		table_kat_lib.ajax.reload(null, false); //reload datatable ajax 
	}

	function kat_lib_save() {
		$('#btnSavekatlib').text('saving...'); //change button text
		$('#btnSavekatlib').attr('disabled', true); //set button disable 
		var url;

		if (save_method_kat_lib == 'add') {
			url = "ajax_add_kat_lib";
		} else {
			url = "ajax_update_kat_lib";
		}
		var form = document.forms.namedItem('formdata');
		var form_data = new FormData(form);

		$.ajax({
			url: url,
			type: "POST",
			data: form_data,
			dataType: "JSON",
			contentType: false,
			processData: false,
			cache: false,
			success: function(data) {

				if (data.status) //if success close modal and reload ajax table
				{
					$('#btnSavekatlib').text('save'); //change button text
					$('#btnSavekatlib').attr('disabled', false); //set button enable 
					$('#kat_lib_modal_form').modal('hide');
					$('#formkatlib')[0].reset();
					kat_lib_reload_table();
				} else {
					for (var i = 0; i < data.inputerror.length; i++) {
						$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
						$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
					}
					$('#btnSavekatlib').text('save'); //change button text
					$('#btnSavekatlib').attr('disabled', false); //set button enable 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error adding / update data');
				$('#btnSavekatlib').text('save'); //change button text
				$('#btnSavekatlib').attr('disabled', false); //set button enable 

			}
		});
	}

	function delete_kat_lib(idkatbook) {
		if (confirm('Are you sure delete this data?')) {
			// ajax delete data to database
			$.ajax({
				url: "ajax_delete_kat_lib/" + idkatbook,
				type: "POST",
				dataType: "JSON",
				success: function(data) {
					//if success reload ajax table
					$('#kat_lib_modal_form').modal('hide');
					kat_lib_reload_table();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Error deleting data');
				}
			});

		}
	}
	//CRUD Kegiatan Khazanah
	var save_method_keg_khazanah; //for save method string
	var table_keg_khazanah;

	function datatable_keg_khazanah() {
		//datatables Pendidikan
		table_keg_khazanah = $('#tablekegkhazanah').DataTable({

			"processing": true, //Feature control the processing indicator.
			"serverSide": true, //Feature control DataTables' server-side processing mode.
			"order": [], //Initial no order.

			// Load data for the table's content from an Ajax source
			"ajax": {
				"url": "ajax_list_keg_khazanah",
				"type": "POST"
			},

			//Set column definition initialisation properties.
			"columnDefs": [{
				"targets": [-1], //last column
				"orderable": false, //set not orderable
			}, ],

		});

		//set input/textarea/select event when change value, remove class error and remove text help block 
		$("input").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
	}

	function keg_khazanah_add_ajax() {
		save_method_keg_khazanah = 'add';
		$('#formkegkhazanah')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		$('#keg_khazanah_modal_form').modal('show'); // show bootstrap modal
		$('.modal-title').text('Add Kegiatan Khazanah'); // Set Title to Bootstrap modal title
		$('#btnSavekegkhazanah').text('save'); //change button text
		$('#btnSavekegkhazanah').attr('disabled', false); //set button enable 
	}

	function keg_khazanah_edit_ajax(idkegkhazanah) {
		save_method_keg_khazanah = 'update';
		$('#formkegkhazanah')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		//Ajax Load data from ajax
		$.ajax({
			url: "ajax_edit_keg_khazanah/" + idkegkhazanah,
			type: "GET",
			dataType: "JSON",
			success: function(data) {

				$('[name="idkegkhazanah"]').val(data.id_keg_khazanah);
				$('[name="jeniskegkhazanah"]').val(data.jenis_keg_khazanah);
				$('[name="nobukukegkhazanah"]').val(data.nobuku_keg_khazanah);
				$('[name="stokkegkhazanah"]').val(data.stok_keg_khazanah);
				$('[name="idbukukegkhazanah"]').val(data.idbuku_keg_khazanah);
				//$('[name="dob"]').datepicker('update',data.dob);
				$('#keg_khazanah_modal_form').modal('show'); // show bootstrap modal when complete loaded
				$('.modal-title').text('Edit Kegiatan Khazanah'); // Set title to Bootstrap modal title

			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error get data from ajax');
			}
		});
	}

	function keg_khazanah_reload_table() {
		table_keg_khazanah.ajax.reload(null, false); //reload datatable ajax 
	}

	function keg_khazanah_save() {
		$('#btnSavekegkhazanah').text('saving...'); //change button text
		$('#btnSavekegkhazanah').attr('disabled', true); //set button disable 
		var url;

		if (save_method_keg_khazanah == 'add') {
			url = "ajax_add_keg_khazanah";
		} else {
			url = "ajax_update_keg_khazanah";
		}
		var form = document.forms.namedItem('formdata');
		var form_data = new FormData(form);

		$.ajax({
			url: url,
			type: "POST",
			data: form_data,
			dataType: "JSON",
			contentType: false,
			processData: false,
			cache: false,
			success: function(data) {

				if (data.status) //if success close modal and reload ajax table
				{
					$('#btnSavekegkhazanah').text('save'); //change button text
					$('#btnSavekegkhazanah').attr('disabled', false); //set button enable 
					$('#keg_khazanah_modal_form').modal('hide');
					$('#formkegkhazanah')[0].reset();
					keg_khazanah_reload_table();
				} else {
					for (var i = 0; i < data.inputerror.length; i++) {
						$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
						$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
					}
					$('#btnSavekegkhazanah').text('save'); //change button text
					$('#btnSavekegkhazanah').attr('disabled', false); //set button enable 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error adding / update data');
				$('#btnSavekegkhazanah').text('save'); //change button text
				$('#btnSavekegkhazanah').attr('disabled', false); //set button enable 

			}
		});
	}

	function delete_keg_khazanah(idkegkhazanah) {
		if (confirm('Are you sure delete this data?')) {
			// ajax delete data to database
			$.ajax({
				url: "ajax_delete_keg_khazanah/" + idkegkhazanah,
				type: "POST",
				dataType: "JSON",
				success: function(data) {
					//if success reload ajax table
					$('#kat_lib_modal_form').modal('hide');
					keg_khazanah_reload_table();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Error deleting data');
				}
			});

		}
	}

	//CRUD Tujuan Khazanah
	var save_method_tujuan_khazanah; //for save method string
	var table_tujuan_khazanah;

	function datatable_tujuan_khazanah() {
		//datatables Pendidikan
		table_tujuan_khazanah = $('#tabletujuankhazanah').DataTable({

			"processing": true, //Feature control the processing indicator.
			"serverSide": true, //Feature control DataTables' server-side processing mode.
			"order": [], //Initial no order.

			// Load data for the table's content from an Ajax source
			"ajax": {
				"url": "ajax_list_tujuan_khazanah",
				"type": "POST"
			},

			//Set column definition initialisation properties.
			"columnDefs": [{
				"targets": [-1], //last column
				"orderable": false, //set not orderable
			}, ],
			
			"minimumInputLength": 1,
			"multiple": true,
			"tokenSeparators": '|'

		});

		//set input/textarea/select event when change value, remove class error and remove text help block 
		$("input").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
	}

	function tujuan_khazanah_add_ajax() {
		save_method_tujuan_khazanah = 'add';
		$('#formtujuankhazanah')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		$('#tujuan_khazanah_modal_form').modal('show'); // show bootstrap modal
		$('.modal-title').text('Add Kegiatan Khazanah'); // Set Title to Bootstrap modal title
		$('#btnSavetujuankhazanah').text('save'); //change button text
		$('#btnSavetujuankhazanah').attr('disabled', false); //set button enable 
	}

	function tujuan_khazanah_edit_ajax(idtujuankhazanah) {
		save_method_tujuan_khazanah = 'update';
		$('#formtujuankhazanah')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		//Ajax Load data from ajax
		$.ajax({
			url: "ajax_edit_tujuan_khazanah/" + idtujuankhazanah,
			type: "GET",
			dataType: "JSON",
			success: function(data) {

				$('[name="idtujuankhazanah"]').val(data.id_tujuan_khazanah);
				$('[name="namatujuankhazanah"]').val(data.nama_tujuan_khazanah);
				//$('[name="dob"]').datepicker('update',data.dob);
				$('#tujuan_khazanah_modal_form').modal('show'); // show bootstrap modal when complete loaded
				$('.modal-title').text('Edit Tujuan Khazanah'); // Set title to Bootstrap modal title

			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error get data from ajax');
			}
		});
	}

	function tujuan_khazanah_reload_table() {
		table_tujuan_khazanah.ajax.reload(null, false); //reload datatable ajax 
	}

	function tujuan_khazanah_save() {
		$('#btnSavetujuanhazanah').text('saving...'); //change button text
		$('#btnSavetujuankhazanah').attr('disabled', true); //set button disable 
		var url;

		if (save_method_tujuan_khazanah == 'add') {
			url = "ajax_add_tujuan_khazanah";
		} else {
			url = "ajax_update_tujuan_khazanah";
		}
		var form = document.forms.namedItem('formdata');
		var form_data = new FormData(form);

		$.ajax({
			url: url,
			type: "POST",
			data: form_data,
			dataType: "JSON",
			contentType: false,
			processData: false,
			cache: false,
			success: function(data) {

				if (data.status) //if success close modal and reload ajax table
				{
					$('#btnSavetujuankhazanah').text('save'); //change button text
					$('#btnSavetujuankhazanah').attr('disabled', false); //set button enable 
					$('#tujuan_khazanah_modal_form').modal('hide');
					$('#formtujuankhazanah')[0].reset();
					tujuan_khazanah_reload_table();
				} else {
					for (var i = 0; i < data.inputerror.length; i++) {
						$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
						$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
					}
					$('#btnSavetujuankhazanah').text('save'); //change button text
					$('#btnSavetujuankhazanah').attr('disabled', false); //set button enable 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error adding / update data');
				$('#btnSavetujuankhazanah').text('save'); //change button text
				$('#btnSavetujuankhazanah').attr('disabled', false); //set button enable 

			}
		});
	}

	function delete_tujuan_khazanah(idtujuankhazanah) {
		if (confirm('Are you sure delete this data?')) {
			// ajax delete data to database
			$.ajax({
				url: "ajax_delete_tujuan_khazanah/" + idtujuankhazanah,
				type: "POST",
				dataType: "JSON",
				success: function(data) {
					//if success reload ajax table
					$('#tujuan_lib_modal_form').modal('hide');
					tujuan_khazanah_reload_table();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Error deleting data');
				}
			});

		}
	}
	//CRUD Jam Khazanah
	var save_method_tujuan_khazanah; //for save method string
	var table_jam_khazanah;

	function datatable_jam_khazanah() {
		//datatables Pendidikan
		table_jam_khazanah = $('#tablejamkhazanah').DataTable({

			"processing": true, //Feature control the processing indicator.
			"serverSide": true, //Feature control DataTables' server-side processing mode.
			"order": [], //Initial no order.

			// Load data for the table's content from an Ajax source
			"ajax": {
				"url": "ajax_list_jam_khazanah",
				"type": "POST"
			},

			//Set column definition initialisation properties.
			"columnDefs": [{
				"targets": [-1], //last column
				"orderable": false, //set not orderable
			}, ],
			
			"minimumInputLength": 1,
			"multiple": true,
			"tokenSeparators": '|'

		});

		//set input/textarea/select event when change value, remove class error and remove text help block 
		$("input").change(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).next().empty();
		});
	}

	function jam_khazanah_add_ajax() {
		save_method_jam_khazanah = 'add';
		$('#formjamkhazanah')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		$('#jam_khazanah_modal_form').modal('show'); // show bootstrap modal
		$('.modal-title').text('Add Jam Khazanah'); // Set Title to Bootstrap modal title
		$('#btnSavejamkhazanah').text('save'); //change button text
		$('#btnSavejamkhazanah').attr('disabled', false); //set button enable 
	}

	function jam_khazanah_edit_ajax(idjamkhazanah) {
		save_method_jam_khazanah = 'update';
		$('#formjamkhazanah')[0].reset(); // reset form on modals
		$('.form-group').removeClass('has-error'); // clear error class
		$('.help-block').empty(); // clear error string
		//Ajax Load data from ajax
		$.ajax({
			url: "ajax_edit_jam_khazanah/" + idjamkhazanah,
			type: "GET",
			dataType: "JSON",
			success: function(data) {

				$('[name="id"]').val(data.id_jam_khazanah);
				$('[name="start"]').val(data.start_jam_khazanah);
				$('[name="end"]').val(data.end_jam_khazanah);
				$('[name="status"]').val(data.status_jam_khazanah);
				//$('[name="dob"]').datepicker('update',data.dob);
				$('#jam_khazanah_modal_form').modal('show'); // show bootstrap modal when complete loaded
				$('.modal-title').text('Edit Jam Khazanah'); // Set title to Bootstrap modal title

			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error get data from ajax');
			}
		});
	}

	function jam_khazanah_reload_table() {
		table_jam_khazanah.ajax.reload(null, false); //reload datatable ajax 
	}

	function jam_khazanah_save() {
		$('#btnSavejamhazanah').text('saving...'); //change button text
		$('#btnSavejamkhazanah').attr('disabled', true); //set button disable 
		var url;

		if (save_method_jam_khazanah == 'add') {
			url = "ajax_add_jam_khazanah";
		} else {
			url = "ajax_update_jam_khazanah";
		}
		var form = document.forms.namedItem('formdata');
		var form_data = new FormData(form);

		$.ajax({
			url: url,
			type: "POST",
			data: form_data,
			dataType: "JSON",
			contentType: false,
			processData: false,
			cache: false,
			success: function(data) {

				if (data.status) //if success close modal and reload ajax table
				{
					$('#btnSavejamkhazanah').text('save'); //change button text
					$('#btnSavejamkhazanah').attr('disabled', false); //set button enable 
					$('#jam_khazanah_modal_form').modal('hide');
					$('#formjamkhazanah')[0].reset();
					jam_khazanah_reload_table();
				} else {
					for (var i = 0; i < data.inputerror.length; i++) {
						$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
						$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
					}
					$('#btnSavejamkhazanah').text('save'); //change button text
					$('#btnSavejamkhazanah').attr('disabled', false); //set button enable 
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error adding / update data');
				$('#btnSavejamkhazanah').text('save'); //change button text
				$('#btnSavejamkhazanah').attr('disabled', false); //set button enable 

			}
		});
	}

	function delete_jam_khazanah(idjamkhazanah) {
		if (confirm('Are you sure delete this data?')) {
			// ajax delete data to database
			$.ajax({
				url: "ajax_delete_jam_khazanah/" + idjamkhazanah,
				type: "POST",
				dataType: "JSON",
				success: function(data) {
					//if success reload ajax table
					$('#jam_lib_modal_form').modal('hide');
					jam_khazanah_reload_table();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Error deleting data');
				}
			});

		}
	}
//CRUD Menu Khazanah
var save_method_menu; //for save method string
var table_menu;

function datatable_menu() {
	//datatables Pendidikan
	table_menu = $('#tablemenu').DataTable({

		"processing": true, //Feature control the processing indicator.
		"serverSide": true, //Feature control DataTables' server-side processing mode.
		"order": [], //Initial no order.

		// Load data for the table's content from an Ajax source
		"ajax": {
			"url": "ajax_list_menu",
			"type": "POST"
		},

		//Set column definition initialisation properties.
		"columnDefs": [{
			"targets": [-1], //last column
			"orderable": false, //set not orderable
		}, ],
		
		"minimumInputLength": 1,
		"multiple": true,
		"tokenSeparators": '|'

	});

	//set input/textarea/select event when change value, remove class error and remove text help block 
	$("input").change(function() {
		$(this).parent().parent().removeClass('has-error');
		$(this).next().empty();
	});
}

function menu_add_ajax() {
	save_method_menu = 'add';
	$('#formmenu')[0].reset(); // reset form on modals
	$('.form-group').removeClass('has-error'); // clear error class
	$('.help-block').empty(); // clear error string
	$('#menu_modal_form').modal('show'); // show bootstrap modal
	$('.modal-title').text('Menu'); // Set Title to Bootstrap modal title
	$('#btnSavemenu').text('save'); //change button text
	$('#btnSavemenu').attr('disabled', false); //set button enable 
}

function menu_edit_ajax(idmenu) {
	save_method_menu = 'update';
	$('#formmenu')[0].reset(); // reset form on modals
	$('.form-group').removeClass('has-error'); // clear error class
	$('.help-block').empty(); // clear error string
	//Ajax Load data from ajax
	$.ajax({
		url: "ajax_edit_menu/" + idmenu,
		type: "GET",
		dataType: "JSON",
		success: function(data) {

			$('[name="idmenu"]').val(data.id_menu);
			$('[name="menu"]').val(data.nama_menu); 	
			//$('[name="dob"]').datepicker('update',data.dob);
			$('#menu_modal_form').modal('show'); // show bootstrap modal when complete loaded
			$('.modal-title').text('Edit Jam Khazanah'); // Set title to Bootstrap modal title

		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('Error get data from ajax');
		}
	});
}

function menu_reload_table() {
	table_menu.ajax.reload(null, false); //reload datatable ajax 
}

function menu_save() {
	$('#btnSavemenu').text('saving...'); //change button text
	$('#btnSavemenu').attr('disabled', true); //set button disable 
	var url;

	if (save_method_menu == 'add') {
		url = "ajax_add_menu";
	} else {
		url = "ajax_update_menu";
	}
	var form = document.forms.namedItem('formdata');
	var form_data = new FormData(form);

	$.ajax({
		url: url,
		type: "POST",
		data: form_data,
		dataType: "JSON",
		contentType: false,
		processData: false,
		cache: false,
		success: function(data) {

			if (data.status) //if success close modal and reload ajax table
			{
				$('#btnSavemenu').text('save'); //change button text
				$('#btnSavemenu').attr('disabled', false); //set button enable 
				$('#menu_modal_form').modal('hide');
				$('#formmenu')[0].reset();
				menu_reload_table();
			} else {
				for (var i = 0; i < data.inputerror.length; i++) {
					$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
					$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
				}
				$('#btnSavemenu').text('save'); //change button text
				$('#btnSavemenu').attr('disabled', false); //set button enable 
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('Error adding / update data');
			$('#btnSavemenu').text('save'); //change button text
			$('#btnSavemenu').attr('disabled', false); //set button enable 

		}
	});
}

function delete_menu(idmenu) {
	if (confirm('Are you sure delete this data?')) {
		// ajax delete data to database
		$.ajax({
			url: "ajax_delete_menu/" + idmenu,
			type: "POST",
			dataType: "JSON",
			success: function(data) {
				//if success reload ajax table
				$('#menu_modal_form').modal('hide');
				menu_reload_table();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error deleting data');
			}
		});

	}
}
//CRUD Sub Menu
var save_method_sub_menu; //for save method string
var table_sub_menu;

function datatable_sub_menu() {
	//datatables Pendidikan
	table_sub_menu = $('#tablesubmenu').DataTable({

		"processing": true, //Feature control the processing indicator.
		"serverSide": true, //Feature control DataTables' server-side processing mode.
		"order": [], //Initial no order.

		// Load data for the table's content from an Ajax source
		"ajax": {
			"url": "ajax_list_sub_menu",
			"type": "POST"
		},

		//Set column definition initialisation properties.
		"columnDefs": [{
			"targets": [-1], //last column
			"orderable": false, //set not orderable
		}, ],
		
		"minimumInputLength": 1,
		"multiple": true,
		"tokenSeparators": '|'

	});

	//set input/textarea/select event when change value, remove class error and remove text help block 
	$("input").change(function() {
		$(this).parent().parent().removeClass('has-error');
		$(this).next().empty();
	});
}

function sub_menu_add_ajax() {
	save_method_sub_menu = 'add';
	$('#formsubmenu')[0].reset(); // reset form on modals
	$('.form-group').removeClass('has-error'); // clear error class
	$('.help-block').empty(); // clear error string
	$('#sub_menu_modal_form').modal('show'); // show bootstrap modal
	$('.modal-title').text('Menu'); // Set Title to Bootstrap modal title
	$('#btnSavesubmenu').text('save'); //change button text
	$('#btnSavesubmenu').attr('disabled', false); //set button enable 
}

function sub_menu_edit_ajax(idsubmenu) {
	save_method_sub_menu = 'update';
	$('#formsubmenu')[0].reset(); // reset form on modals
	$('.form-group').removeClass('has-error'); // clear error class
	$('.help-block').empty(); // clear error string
	//Ajax Load data from ajax
	$.ajax({
		url: "ajax_edit_sub_menu/" + idsubmenu,
		type: "GET",
		dataType: "JSON",
		success: function(data) {

			$('[name="idmenu"]').val(data.id);
			$('[name="menuid"]').val(data.menu_id);
			$('[name="title"]').val(data.title);
			$('[name="icon"]').val(data.icon);
			$('[name="url"]').val(data.url);
			$('[name="is_active"]').val(data.is_active); 	
			//$('[name="dob"]').datepicker('update',data.dob);
			$('#sub_menu_modal_form').modal('show'); // show bootstrap modal when complete loaded
			$('.modal-title').text('Edit'); // Set title to Bootstrap modal title

		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('Error get data from ajax');
		}
	});
}

function sub_menu_reload_table() {
	table_sub_menu.ajax.reload(null, false); //reload datatable ajax 
}

function sub_menu_save() {
	$('#btnSavesubmenu').text('saving...'); //change button text
	$('#btnSavesubmenu').attr('disabled', true); //set button disable 
	var url;

	if (save_method_sub_menu == 'add') {
		url = "ajax_add_sub_menu";
	} else {
		url = "ajax_update_sub_menu";
	}
	var form = document.forms.namedItem('formdata');
	var form_data = new FormData(form);

	$.ajax({
		url: url,
		type: "POST",
		data: form_data,
		dataType: "JSON",
		contentType: false,
		processData: false,
		cache: false,
		success: function(data) {

			if (data.status) //if success close modal and reload ajax table
			{
				$('#btnSavesubmenu').text('save'); //change button text
				$('#btnSavesubmenu').attr('disabled', false); //set button enable 
				$('#sub_menu_modal_form').modal('hide');
				$('#formsubmenu')[0].reset();
				sub_menu_reload_table();
			} else {
				for (var i = 0; i < data.inputerror.length; i++) {
					$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
					$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
				}
				$('#btnSavesubmenu').text('save'); //change button text
				$('#btnSavesubmenu').attr('disabled', false); //set button enable 
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('Error adding / update data');
			$('#btnSavesubmenu').text('save'); //change button text
			$('#btnSavesubmenu').attr('disabled', false); //set button enable 

		}
	});
}

function delete_sub_menu(idsubmenu) {
	if (confirm('Are you sure delete this data?')) {
		// ajax delete data to database
		$.ajax({
			url: "ajax_delete_sub_menu/" + idsubmenu,
			type: "POST",
			dataType: "JSON",
			success: function(data) {
				//if success reload ajax table
				$('#menu_modal_form').modal('hide');
				sub_menu_reload_table();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error deleting data');
			}
		});

	}
}

//CRUD Access Menu
var save_method_access_menu; //for save method string
var table_access_menu;

function datatable_access_menu() {
	//datatables Pendidikan
	table_access_menu = $('#tableaccessmenu').DataTable({

		"processing": true, //Feature control the processing indicator.
		"serverSide": true, //Feature control DataTables' server-side processing mode.
		"order": [], //Initial no order.

		// Load data for the table's content from an Ajax source
		"ajax": {
			"url": "ajax_list_access_menu",
			"type": "POST"
		},

		//Set column definition initialisation properties.
		"columnDefs": [{
			"targets": [-1], //last column
			"orderable": false, //set not orderable
		}, ],
		
		"minimumInputLength": 1,
		"multiple": true,
		"tokenSeparators": '|'

	});

	//set input/textarea/select event when change value, remove class error and remove text help block 
	$("input").change(function() {
		$(this).parent().parent().removeClass('has-error');
		$(this).next().empty();
	});
}

function access_menu_add_ajax() {
	save_method_access_menu = 'add';
	$('#formaccessmenu')[0].reset(); // reset form on modals
	$('.form-group').removeClass('has-error'); // clear error class
	$('.help-block').empty(); // clear error string
	$('#access_menu_modal_form').modal('show'); // show bootstrap modal
	$('.modal-title').text('Menu'); // Set Title to Bootstrap modal title
	$('#btnSaveaccessmenu').text('save'); //change button text
	$('#btnSaveaccessmenu').attr('disabled', false); //set button enable 
}

function access_menu_edit_ajax(idaccessmenu) {
	save_method_access_menu = 'update';
	$('#formaccessmenu')[0].reset(); // reset form on modals
	$('.form-group').removeClass('has-error'); // clear error class
	$('.help-block').empty(); // clear error string
	//Ajax Load data from ajax
	$.ajax({
		url: "ajax_edit_access_menu/" + idaccessmenu,
		type: "GET",
		dataType: "JSON",
		success: function(data) {

			$('[name="idmenu"]').val(data.id);
			$('[name="roleid"]').val(data.role_id);
			$('[name="menuid"]').val(data.menu_id);
			//$('[name="menuid"]').val(data.menu_id); 	
			//$('[name="dob"]').datepicker('update',data.dob);
			$('#access_menu_modal_form').modal('show'); // show bootstrap modal when complete loaded
			$('.modal-title').text('Edit'); // Set title to Bootstrap modal title

		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('Error get data from ajax');
		}
	});
}

function access_menu_reload_table() {
	table_access_menu.ajax.reload(null, false); //reload datatable ajax 
}

function access_menu_save() {
	$('#btnSaveaccessmenu').text('saving...'); //change button text
	$('#btnSaveaccessmenu').attr('disabled', true); //set button disable 
	var url;

	if (save_method_access_menu == 'add') {
		url = "ajax_add_access_menu";
	} else {
		url = "ajax_update_access_menu";
	}
	var form = document.forms.namedItem('formdata');
	var form_data = new FormData(form);

	$.ajax({
		url: url,
		type: "POST",
		data: form_data,
		dataType: "JSON",
		contentType: false,
		processData: false,
		cache: false,
		success: function(data) {

			if (data.status) //if success close modal and reload ajax table
			{
				$('#btnSaveaccessmenu').text('save'); //change button text
				$('#btnSaveaccessmenu').attr('disabled', false); //set button enable 
				$('#access_menu_modal_form').modal('hide');
				$('#formaccessmenu')[0].reset();
				access_menu_reload_table();
			} else {
				for (var i = 0; i < data.inputerror.length; i++) {
					$('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
					$('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
				}
				$('#btnSaveaccessmenu').text('save'); //change button text
				$('#btnSaveaccessmenu').attr('disabled', false); //set button enable 
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('Error adding / update data');
			$('#btnSaveaccessmenu').text('save'); //change button text
			$('#btnSaveaccessmenu').attr('disabled', false); //set button enable 

		}
	});
}

function delete_access_menu(idaccessmenu) {
	if (confirm('Are you sure delete this data?')) {
		// ajax delete data to database
		$.ajax({
			url: "ajax_delete_access_menu/" + idaccessmenu,
			type: "POST",
			dataType: "JSON",
			success: function(data) {
				//if success reload ajax table
				$('#access_menu_modal_form').modal('hide');
				access_menu_reload_table();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Error deleting data');
			}
		});

	}
}