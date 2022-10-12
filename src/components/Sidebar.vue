<template>
    <div>
        <!-- Menu -->
        <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
            <div class="app-brand demo">
            <a href="/" class="app-brand-link">
                <img src="assets/img/favicon/mp-logo.png" width="30"/>
                    <g id="g-app-brand" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                        <g id="Icon" transform="translate(27.000000, 15.000000)">
                        <g id="Mask" transform="translate(0.000000, 8.000000)">
                            <mask id="mask-2" fill="white">
                            <use xlink:href="#path-1"></use>
                            </mask>
                            <use fill="#696cff" xlink:href="#path-1"></use>
                            <g id="Path-3" mask="url(#mask-2)">
                            <use fill="#696cff" xlink:href="#path-3"></use>
                            <use fill-opacity="0.2" fill="#FFFFFF" xlink:href="#path-3"></use>
                            </g>
                            <g id="Path-4" mask="url(#mask-2)">
                            <use fill="#696cff" xlink:href="#path-4"></use>
                            <use fill-opacity="0.2" fill="#FFFFFF" xlink:href="#path-4"></use>
                            </g>
                        </g>
                        <g
                            id="Triangle"
                            transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                        >
                            <use fill="#696cff" xlink:href="#path-5"></use>
                            <use fill-opacity="0.2" fill="#FFFFFF" xlink:href="#path-5"></use>
                        </g>
                        </g>
                    </g>
                    </g>
                <span class="app-brand-text demo menu-text fw-bolder ms-2">M'Payment</span>
            </a>

            <router-link to="/" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                <i class="bx bx-chevron-left bx-sm align-middle"></i>
            </router-link>
            </div>

            <div class="menu-inner-shadow"></div>

            <ul class="menu-inner py-1">
            <!-- Dashboard -->
            <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Home</span>
            </li>

            <li class="menu-item">
                <router-link to="/" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Dashboard</div>
                </router-link>
            </li>

            <!-- Components -->
            <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Data</span>
            </li>
            
            <li class="menu-item">
                <router-link to="/grade" class="menu-link">
                <i class="menu-icon tf-icons bx bx-chalkboard"></i>
                <div data-i18n="Basic">Grade</div>
                </router-link>
            </li>

            <li class="menu-item">
                <router-link to="/student" class="menu-link">
                <i class="menu-icon tf-icons bx bx-user-pin"></i>
                <div data-i18n="User interface">Student</div>
                </router-link>
            </li>

            <li class="menu-item">
                <router-link to="/officer" class="menu-link">
                <i class="menu-icon tf-icons bx bx-crown"></i>
                <div data-i18n="Extended UI">Officer</div>
                </router-link>
            </li>

            <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Transaction</span>
            </li>

            <li class="menu-item">
                <router-link to="/payment" class="menu-link">
                <i class="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Boxicons">Payment</div>
                </router-link>
            </li>

            <li class="menu-item">
                <router-link to="/transaction" class="menu-link">
                <i class="menu-icon tf-icons bx bx-book-reader"></i>
                <div data-i18n="Boxicons">Transaction</div>
                </router-link>
            </li>

            <li class="menu-item">
                <router-link to="/detail" class="menu-link">
                <i class="menu-icon tf-icons bx bx-file"></i>
                <div data-i18n="Boxicons">Detail</div>
                </router-link>
            </li>
            </ul>
        </aside>
        <!-- / Menu -->
    </div>
</template>

<script>
    export default {
        name : "Sidebar_page",
    }
</script>