	function a(params) {
		
	}
	$(document).ready(function() { // Ketika halaman sudah siap (sudah selesai di load)
		// Kita sembunyikan dulu untuk loadingnya
		// $("#loading").hide();

		$("#jabatan").change(function() { // Ketika user mengganti atau memilih data provinsi
			$("#gapok").hide(); // Sembunyikan dulu combobox kota nya
			// $("#loading").show(); // Tampilkan loadingnya

			$.ajax({
				type: "POST", // Method pengiriman data bisa dengan GET atau POST
				url: "<?php echo base_url("admin/gaji/listgapok"); ?>", // Isi dengan url/path file php yang dituju
				data: {
					id_kat_jabatan: $("#jabatan").val()
				}, // data yang akan dikirim ke file yang dituju
				dataType: "json",
				beforeSend: function(e) {
					if (e && e.overrideMimeType) {
						e.overrideMimeType("application/json;charset=UTF-8");
					}
				},
				success: function(response) { // Ketika proses pengiriman berhasil
					// $("#loading").hide(); // Sembunyikan loadingnya

					// set isi dari combobox kota
					// lalu munculkan kembali combobox kotanya
					$("#gapok").html(response.list_gapok).show();
				},
				error: function(xhr, ajaxOptions, thrownError) { // Ketika ada error
					alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError); // Munculkan alert error
				}
			});
		});
	});


	$(document).ready(function() { // Ketika halaman sudah siap (sudah selesai di load)
		// Kita sembunyikan dulu untuk loadingnya
		// $("#loading").hide();

		$("#jabatan").change(function() { // Ketika user mengganti atau memilih data provinsi
			$("#gaji_jabatan").hide(); // Sembunyikan dulu combobox kota nya
			// $("#loading").show(); // Tampilkan loadingnya

			$.ajax({
				type: "POST", // Method pengiriman data bisa dengan GET atau POST
				url: "<?php echo base_url("admin/gaji/jab"); ?>", // Isi dengan url/path file php yang dituju
				data: {
					id_kat_jabatan: $("#jabatan").val()
				}, // data yang akan dikirim ke file yang dituju
				dataType: "json",
				beforeSend: function(e) {
					if (e && e.overrideMimeType) {
						e.overrideMimeType("application/json;charset=UTF-8");
					}
				},
				success: function(response) { // Ketika proses pengiriman berhasil
					// $("#loading").hide(); // Sembunyikan loadingnya

					// set isi dari combobox kota
					// lalu munculkan kembali combobox kotanya
					$("#gaji_jabatan").html(response.list_jab).show();
				},
				error: function(xhr, ajaxOptions, thrownError) { // Ketika ada error
					alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError); // Munculkan alert error
				}
			});
		});
	});


	$(document).ready(function() { // Ketika halaman sudah siap (sudah selesai di load)
		// Kita sembunyikan dulu untuk loadingnya
		// $("#loading").hide();

		$("#golongan").change(function() { // Ketika user mengganti atau memilih data provinsi
			$("#gaji_gol").hide(); // Sembunyigol dulu combobox kota nya
			// $("#loading").show(); // Tampilkan loadingnya

			$.ajax({
				type: "POST", // Method pengiriman data bisa dengan GET atau POST
				url: "<?php echo base_url("admin/gaji/listgol"); ?>", // Isi dengan url/path file php yang dituju
				data: {
					id_kat_golongan: $("#golongan").val()
				}, // data yang akan dikirim ke file yang dituju
				dataType: "json",
				beforeSend: function(e) {
					if (e && e.overrideMimeType) {
						e.overrideMimeType("application/json;charset=UTF-8");
					}
				},
				success: function(response) { // Ketika proses pengiriman berhasil
					// $("#loading").hide(); // Sembunyikan loadingnya

					// set isi dari combobox kota
					// lalu munculkan kembali combobox kotanya
					$("#gaji_gol").html(response.list_gol).show();
				},
				error: function(xhr, ajaxOptions, thrownError) { // Ketika ada error
					alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError); // Munculkan alert error
				}
			});
		});
	});


	$(document).ready(function() { // Ketika halaman sudah siap (sudah selesai di load)
		// Kita sembunyikan dulu untuk loadingnya
		// $("#loading").hide();

		$("#pend").change(function() { // Ketika user mengganti atau memilih data provinsi
			$("#gaji_pend").hide(); // Sembunyigol dulu combobox kota nya
			// $("#loading").show(); // Tampilkan loadingnya

			$.ajax({
				type: "POST", // Method pengiriman data bisa dengan GET atau POST
				url: "<?php echo base_url("admin/gaji/listpend"); ?>", // Isi dengan url/path file php yang dituju
				data: {
					id_pendidikan: $("#pend").val()
				}, // data yang akan dikirim ke file yang dituju
				dataType: "json",
				beforeSend: function(e) {
					if (e && e.overrideMimeType) {
						e.overrideMimeType("application/json;charset=UTF-8");
					}
				},
				success: function(response) { // Ketika proses pengiriman berhasil
					// $("#loading").hide(); // Sembunyikan loadingnya

					// set isi dari combobox kota
					// lalu munculkan kembali combobox kotanya
					$("#gaji_pend").html(response.list_pend).show();
				},
				error: function(xhr, ajaxOptions, thrownError) { // Ketika ada error
					alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError); // Munculkan alert error
				}
			});
		});
	});