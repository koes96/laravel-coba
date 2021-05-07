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
    <link href="{{ asset('plugin') }}/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
    <link href="{{ asset('plugin') }}/images/favicon-32x32.png" type="image/png" rel="icon">
    <link href="{{ asset('plugin') }}/css/bootstrap.min.css" rel="stylesheet">
    <link href="{{ asset('plugin') }}/css/icons.css" rel="stylesheet">
    <link href="{{ asset('plugin') }}/js/jquery-ui.min.css" rel="stylesheet">
    <!-- Custom styles for this template-->
    <link href="{{ asset('plugin') }}/css/app.css" rel="stylesheet">

    @yield('css-plugins')
    @yield('css-script')
</head>

<body class="bg-login">
                    <div class="wrapper">
                        <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
                            <div class="container-fluid">
                                <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                                    <div class="col mx-auto">
                                        <div class="mb-4 text-center">
                                            <img src="{{ asset('plugin') }}/images/logo-img.png" width="180" alt="" />
                                        </div>
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="border p-4 rounded">
                                                    <div class="text-center">
                                                        
                                            <!-- Page Heading -->
                                            <h3 class="">{{ $pageTitle ?? 'Dashboard' }}</h3>
                                                    </div>
                                                    <form class="row g-3 mb-2" action="{{ route('login') }}" method="post">
                                                        @csrf
                                                        <div class="form-body">
                                                            <div class="col-12">
                                                                <label for="username" class="form-label">Email</label>
                                                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                                                            </div>
                                                            <div class="col-12">
                                                                <label for="password" class="form-label">Enter Password</label>
                                                                <div class="input-group" id="show_hide_password">
                                                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="d-grid">
                                                                <button type="submit" name="submit" class="btn btn-primary"><i class="bx bxs-lock-open"></i>Sign in</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--end row-->
                        </div>
                    </div>
    
    <!-- Bootstrap core JavaScript-->
    <script src="{{ asset('plugin') }}/vendor/jquery/jquery.min.js"></script>
    <script src="{{ asset('plugin') }}/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    
    <!-- Core plugin JavaScript-->
    <script src="{{ asset('plugin') }}/vendor/jquery-easing/jquery.easing.min.js"></script>
    
    <!-- Custom scripts for all pages-->
    <script src="{{ asset('plugin') }}/js/app.js"></script>
    
    
    <script src="{{ asset('plugin') }}/js/jquery-ui.min.js"></script>


    <script type="text/javascript">
        $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              }
        });
    </script>
    @yield('js-plugins')
    @yield('js-script')
</body>

</html>