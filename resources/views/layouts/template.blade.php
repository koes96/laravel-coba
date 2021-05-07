<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $title ?? 'Dashboard' }}</title>

    <!-- Custom fonts for this template-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.9.2/tailwind.min.css" integrity="sha512-l7qZAq1JcXdHei6h2z8h8sMe3NbMrmowhOl+QkP3UhifPpCW2MC4M0i26Y8wYpbz1xD9t61MLT9L1N773dzlOA==" crossorigin="anonymous" />
    <link href="{{ asset('plugin') }}/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
    <link href="{{ asset('plugin') }}/images/favicon-32x32.png" type="image/png" rel="icon">
    <link href="{{ asset('plugin') }}/css/bootstrap.min.css" rel="stylesheet">
    <link href="{{ asset('plugin') }}/css/icons.css" rel="stylesheet">    
    <link href="{{ asset('plugin') }}/js/jquery-ui.min.css" rel="stylesheet">
    <link href="{{ asset('plugin') }}/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
	<link href="{{ asset('plugin') }}/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />
	<link href="{{ asset('plugin') }}/plugins/metismenu/css/metisMenu.min.css" rel="stylesheet" />
    <!-- Custom styles for this template-->
    <link href="{{ asset('plugin') }}/css/app.css" rel="stylesheet">

    @yield('css-plugins')
    @yield('css-script')
    @livewireStyles
</head>

<body>

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        @include('layouts.sidebar')
        <!-- End of Sidebar -->
        <!-- Topbar Navbar -->
        @include('layouts.navbar')
        <!-- End of Topbar Navbar -->
            <!-- Main Content -->
            <div class="page-wrapper">
                <!-- Begin Page Content -->
                <div class="page-content">
                    <!-- Page Heading -->
                    <h1 class="h3 mb-4 text-gray-800">{{ $pageTitle ?? 'Dashboard' }}</h1>
                    @yield('content')
                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="page-footer">
                <p class="mb-0">Copyright © 2021. All right reserved.</p>
            </footer>
            <!-- End of Footer -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Yakin Logout?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    
                    <form method="POST" action="/logout">
                        @csrf
                        <button class="btn btn-primary">Logout</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="{{ asset('plugin') }}/vendor/jquery/jquery.min.js"></script>
    <script src="{{ asset('plugin') }}/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    
    <!-- Core plugin JavaScript-->
    <script src="{{ asset('plugin') }}/vendor/jquery-easing/jquery.easing.min.js"></script>
    
    <!-- Custom scripts for all pages-->
    <script src="{{ asset('plugin') }}/js/app.js"></script>
    
    
    @yield('script')
    <script src="{{ asset('plugin') }}/plugins/simplebar/js/simplebar.min.js"></script>
    <script src="{{ asset('plugin') }}/plugins/metismenu/js/metisMenu.min.js"></script>
    <script src="{{ asset('plugin') }}/plugins/perfect-scrollbar/js/perfect-scrollbar.js"></script>


    <script type="text/javascript">
        $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              }
        });
    </script>
    @yield('js-plugins')
    @yield('js-script')
    @livewireScripts
</body>

</html>