	function sum() {
		//tunjangan
		var gapok = document.getElementById('gapok').value;
		var gaji_jabatan = document.getElementById('gaji_jabatan').value;
		var gaji_gol = document.getElementById('gaji_gol').value;
		var gaji_pend = document.getElementById('gaji_pend').value;
		var makan = document.getElementById('makan').value;
		var pulsa = document.getElementById('pulsa').value;
		var transport = document.getElementById('transport').value;
		// input potongan
		var input_k = document.getElementById('input_k').value;

		var tun_lain = document.getElementById('tun_lain').value;

		//
		var bpjs_k = document.getElementById('bpjs_k').value;



		// total tunjangan
		// tunjangan gapok
		if (gapok == "") {
			var gapok_k = 0;
		} else {
			var gapok_k = parseInt(gapok.split(".").join(""));
		}


		// tunjangan jabatan
		if (gaji_jabatan == "") {
			var gaji_jabatan_k = 0;
		} else {
			var gaji_jabatan_k = parseInt(gaji_jabatan.split(".").join(""));
		}


		// gaji golongan
		if (gaji_gol == "") {
			var gaji_gol_k = 0;
		} else {
			var gaji_gol_k = parseInt(gaji_gol.split(".").join(""));
		}

		// gaji pend
		if (gaji_pend == "") {
			var gaji_pend_k = 0;
		} else {
			var gaji_pend_k = parseInt(gaji_pend.split(".").join(""));
		}

		// tunjangan makan
		if (makan == "") {
			var makan_k = 0;
		} else {
			var makan_k = parseInt(makan.split(".").join(""));
		}

		// tunjangan makan
		if (tun_lain == "") {
			var tun_lain = 0;
		} else {
			var tun_lain = parseInt(tun_lain.split(".").join(""));
		}

		//tunjangan pulsa
		if (pulsa == "") {
			var pulsa_k = 0;
		} else {
			var pulsa_k = parseInt(pulsa.split(".").join(""));
		}
		// tunjangan transport
		if (transport == "") {
			var transport_k = 0;
		} else {
			var transport_k = parseInt(transport.split(".").join(""));
		}


		// total potongan
		//potongan pajak
		if (bpjs_k == "") {
			var bpjs_k = 0;
		} else {
			var bpjs_k = parseInt(bpjs_k.split(".").join(""));
		}



		//input potongan karyawan bpjs
		if (input_k == "") {
			var input_k = 0;
		} else {
			var input_k = parseInt(input_k.split(".").join(""));
		}



		// Gaji Kotor
		var kotor = makan_k + pulsa_k + transport_k + gaji_pend_k + gaji_gol_k + gaji_jabatan_k + gapok_k + tun_lain;
		if (!isNaN(kotor)) {
			document.getElementById('g_kotor').value = kotor.toString();
		}

		// Total Potongan
		var pot = (gapok_k * input_k) / 100
		if (!isNaN(pot)) {
			document.getElementById('jml_pot').value = pot.toString();
		}


		// Input pot kesehatan karyawan
		var pot_kes = (gapok_k * input_k) / 100;
		if (!isNaN(pot_kes)) {
			document.getElementById('bpjs_k').value = pot_kes.toString();
		}


		// Input pot kesehatan karyawan



		// gaji bersih
		var jml_total = parseInt(kotor) - parseInt(pot);
		if (!isNaN(jml_total)) {
			document.getElementById('g_bersih').value = jml_total.toString();
		}
		// gaji bersih
	}
