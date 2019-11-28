/******************************************************************************
 * _____          _        ____           _   _                   _
 *|_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
 *  | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
 *  | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
 *  |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|
 *
 * By Stéphane Bressani
 *  ____  _             _
 * / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 * \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
 *  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 * |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
 *               | |stephane-bressani.ch
 *               |_|github.com/stephaneworkspace
 *
 * The licence is divided in two parts
 *
 * 1. Backend Asp.net C# part:
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 *****************************************************************************/
import {Menu} from './menu.model';
export const verticalMenuItemsSmall = [
  new Menu(1, 'Dashboard', '/index', null, 'dashboard', null, false, 0),
  new Menu(2, 'Comptabilité', null, null, 'view_module', null, true, 0),
  new Menu(3, 'Bilan situation à l\'écran', '/index/comptabilite/bilan-ecran',
           null, 'view_array', null, false, 2),
  new Menu(4, 'Saisie d\'écritures', '/index/comptabilite/saisie-ecritures',
           null, 'open_in_new', null, false, 2),
  new Menu(5, 'Journaliser écritures',
           '/index/comptabilite/journaliser-ecritures', null, 'list', null,
           false, 2)
];
export const verticalMenuItems = [
  new Menu(1, 'Dashboard', '/index', null, 'dashboard', null, false, 0),
  new Menu(2, 'Comptabilité', null, null, 'view_module', null, true, 0),
  new Menu(3, 'Bilan situation à l\'écran', '/index/comptabilite/bilan-ecran',
           null, 'view_array', null, false, 2),
  new Menu(4, 'Saisie d\'écritures', '/index/comptabilite/saisie-ecritures',
           null, 'open_in_new', null, false, 2),
  new Menu(5, 'Journaliser écritures',
           '/index/comptabilite/journaliser-ecritures', null, 'list', null,
           false, 2),
  new Menu(6, 'Users', '/index//users', null, 'supervisor_account', null, false,
           0),
  new Menu(7, 'UI Features', null, null, 'computer', null, true, 0),
  new Menu(8, 'Buttons', '/index//ui/buttons', null, 'keyboard', null, false,
           7),
  new Menu(9, 'Cards', '/index/ui/cards', null, 'card_membership', null, false,
           7),
  new Menu(10, 'Lists', '/index/ui/lists', null, 'list', null, false, 7),
  new Menu(11, 'Grids', '/index/ui/grids', null, 'grid_on', null, false, 7),
  new Menu(12, 'Tabs', '/index/ui/tabs', null, 'tab', null, false, 7),
  new Menu(13, 'Expansion Panel', '/index/ui/expansion-panel', null, 'dns',
           null, false, 7),
  new Menu(14, 'Chips', '/index/ui/chips', null, 'label', null, false, 7),
  new Menu(15, 'Progress', '/index/ui/progress', null, 'data_usage', null,
           false, 7),
  new Menu(16, 'Dialog', '/index/ui/dialog', null, 'open_in_new', null, false,
           7),
  new Menu(17, 'Tooltip', '/index/ui/tooltip', null, 'chat_bubble', null, false,
           7),
  new Menu(18, 'Snackbar', '/index/ui/snack-bar', null, 'sms', null, false, 7),
  new Menu(19, 'Dynamic Menu', '/index/dynamic-menu', null,
           'format_list_bulleted', null, false, 0),
  new Menu(20, 'Mailbox', '/index/mailbox', null, 'email', null, false, 0),
  new Menu(21, 'Chat', '/index/chat', null, 'chat', null, false, 0),
  new Menu(22, 'Form Controls', null, null, 'dvr', null, true, 0),
  new Menu(23, 'Autocomplete', '/index/form-controls/autocomplete', null,
           'short_text', null, false, 22),
  new Menu(24, 'Checkbox', '/index/form-controls/checkbox', null, 'check_box',
           null, false, 22),
  new Menu(25, 'Datepicker', '/index/form-controls/datepicker', null, 'today',
           null, false, 22),
  new Menu(26, 'Form field', '/index/form-controls/form-field', null,
           'view_stream', null, false, 22),
  new Menu(27, 'Input', '/index/form-controls/input', null, 'input', null,
           false, 22),
  new Menu(28, 'Radio button', '/index/form-controls/radio-button', null,
           'radio_button_checked', null, false, 22),
  new Menu(29, 'Select', '/index/form-controls/select', null,
           'playlist_add_check', null, false, 22),
  new Menu(30, 'Slider', '/index/form-controls/slider', null, 'tune', null,
           false, 22),
  new Menu(31, 'Slide toggle', '/index/form-controls/slide-toggle', null,
           'star_half', null, false, 22),
  new Menu(32, 'Tables', null, null, 'view_module', null, true, 0),
  new Menu(33, 'Basic', '/index/tables/basic', null, 'view_column', null, false,
           32),
  new Menu(34, 'Paging', '/index/tables/paging', null, 'last_page', null, false,
           32),
  new Menu(35, 'Sorting', '/index/tables/sorting', null, 'sort', null, false,
           32),
  new Menu(36, 'Filtering', '/index/tables/filtering', null,
           'format_line_spacing', null, false, 32),
  new Menu(37, 'Selecting', '/index/tables/selecting', null,
           'playlist_add_check', null, false, 32),
  new Menu(38, 'NGX DataTable', '/index/tables/ngx-table', null, 'view_array',
           null, false, 32),
  new Menu(40, 'Pages', null, null, 'library_books', null, true, 0),
  new Menu(43, 'Login', '/login', null, 'exit_to_app', null, false, 40),
  new Menu(44, 'Register', '/register', null, 'person_add', null, false, 40),
  new Menu(45, 'Blank', '/blank', null, 'check_box_outline_blank', null, false,
           40),
  new Menu(46, 'Page Not Found', '/pagenotfound', null, 'error_outline', null,
           false, 40),
  new Menu(47, 'Error', '/error', null, 'warning', null, false, 40),
  new Menu(49, 'Profile', null, null, 'person', null, true, 40),
  new Menu(50, 'Projects', '/index/profile/projects', null, 'note', null, false,
           49),
  new Menu(51, 'User Info', '/index/profile/user-info', null,
           'perm_contact_calendar', null, false, 49),
  new Menu(55, 'Schedule', '/index/schedule', null, 'event', null, false, 0),
  new Menu(66, 'Maps', null, null, 'map', null, true, 0),
  new Menu(67, 'Google Maps', '/index/maps/googlemaps', null, 'location_on',
           null, false, 66),
  new Menu(68, 'Leaflet Maps', '/index/maps/leafletmaps', null, 'my_location',
           null, false, 66),
  new Menu(70, 'Charts', null, null, 'multiline_chart', null, true, 0),
  new Menu(71, 'Bar Charts', '/index/charts/bar', null, 'insert_chart', null,
           false, 70),
  new Menu(72, 'Pie Charts', '/index/charts/pie', null, 'pie_chart', null,
           false, 70),
  new Menu(73, 'Line Charts', '/index/charts/line', null, 'show_chart', null,
           false, 70),
  new Menu(74, 'Bubble Charts', '/index/charts/bubble', null, 'bubble_chart',
           null, false, 70),
  new Menu(81, 'Drag & Drop', '/index/drag-drop', null, 'mouse', null, false,
           0),
  new Menu(85, 'Material Icons', '/index/icons', null, 'insert_emoticon', null,
           false, 0),
  new Menu(140, 'Level 1', null, null, 'more_horiz', null, true, 0),
  new Menu(141, 'Level 2', null, null, 'folder_open', null, true, 140),
  new Menu(142, 'Level 3', null, null, 'folder_open', null, true, 141),
  new Menu(143, 'Level 4', null, null, 'folder_open', null, true, 142),
  new Menu(144, 'Level 5', null, 'http://themeseason.com', 'link', null, false,
           143),
  new Menu(200, 'External Link', null, 'http://themeseason.com', 'open_in_new',
           '_blank', false, 0)
];
/**
 * A faire (dans dev Azure bugs)
 */
export const horizontalMenuItems = [
  new Menu(1, 'Dashboard', '/index', null, 'dashboard', null, false, 0),
  new Menu(2, 'Users', '/index/users', null, 'supervisor_account', null, false,
           0),
  new Menu(3, 'UI Features', null, null, 'computer', null, true, 0),
  new Menu(4, 'Buttons', '/index/ui/buttons', null, 'keyboard', null, false, 3),
  new Menu(5, 'Cards', '/index/ui/cards', null, 'card_membership', null, false,
           3),
  new Menu(6, 'Lists', '/index/ui/lists', null, 'list', null, false, 3),
  new Menu(7, 'Grids', '/index/ui/grids', null, 'grid_on', null, false, 3),
  new Menu(8, 'Tabs', '/index/ui/tabs', null, 'tab', null, false, 3),
  new Menu(9, 'Expansion Panel', '/index/ui/expansion-panel', null, 'dns', null,
           false, 3),
  new Menu(10, 'Chips', '/index/ui/chips', null, 'label', null, false, 3),
  new Menu(11, 'Progress', '/index/ui/progress', null, 'data_usage', null,
           false, 3),
  new Menu(12, 'Dialog', '/index/ui/dialog', null, 'open_in_new', null, false,
           3),
  new Menu(13, 'Tooltip', '/index/ui/tooltip', null, 'chat_bubble', null, false,
           3),
  new Menu(14, 'Snackbar', '/index/ui/snack-bar', null, 'sms', null, false, 3),
  new Menu(16, 'Mailbox', '/index/mailbox', null, 'email', null, false, 40),
  new Menu(17, 'Chat', '/index/chat', null, 'chat', null, false, 40),
  new Menu(20, 'Form Controls', null, null, 'dvr', null, true, 0),
  new Menu(21, 'Autocomplete', '/index/form-controls/autocomplete', null,
           'short_text', null, false, 20),
  new Menu(22, 'Checkbox', '/index/form-controls/checkbox', null, 'check_box',
           null, false, 20),
  new Menu(23, 'Datepicker', '/index/form-controls/datepicker', null, 'today',
           null, false, 20),
  new Menu(24, 'Form field', '/index/form-controls/form-field', null,
           'view_stream', null, false, 20),
  new Menu(25, 'Input', '/index/form-controls/input', null, 'input', null,
           false, 20),
  new Menu(26, 'Radio button', '/index/form-controls/radio-button', null,
           'radio_button_checked', null, false, 20),
  new Menu(27, 'Select', '/index/form-controls/select', null,
           'playlist_add_check', null, false, 20),
  new Menu(28, 'Slider', '/index/form-controls/slider', null, 'tune', null,
           false, 20),
  new Menu(29, 'Slide toggle', '/index/form-controls/slide-toggle', null,
           'star_half', null, false, 20),
  new Menu(30, 'Tables', null, null, 'view_module', null, true, 0),
  new Menu(31, 'Basic', '/index/tables/basic', null, 'view_column', null, false,
           30),
  new Menu(32, 'Paging', '/index/tables/paging', null, 'last_page', null, false,
           30),
  new Menu(33, 'Sorting', '/index/tables/sorting', null, 'sort', null, false,
           30),
  new Menu(34, 'Filtering', '/index/tables/filtering', null,
           'format_line_spacing', null, false, 30),
  new Menu(35, 'Selecting', '/index/tables/selecting', null,
           'playlist_add_check', null, false, 30),
  new Menu(36, 'NGX DataTable', '/index/tables/ngx-table', null, 'view_array',
           null, false, 30),
  new Menu(70, 'Charts', null, null, 'multiline_chart', null, true, 0),
  new Menu(71, 'Bar Charts', '/index/charts/bar', null, 'insert_chart', null,
           false, 70),
  new Menu(72, 'Pie Charts', '/index/charts/pie', null, 'pie_chart', null,
           false, 70),
  new Menu(73, 'Line Charts', '/index/charts/line', null, 'show_chart', null,
           false, 70),
  new Menu(74, 'Bubble Charts', '/index/charts/bubble', null, 'bubble_chart',
           null, false, 70),
  new Menu(66, 'Maps', null, null, 'map', null, true, 70),
  new Menu(67, 'Google Maps', '/index/maps/googlemaps', null, 'location_on',
           null, false, 66),
  new Menu(68, 'Leaflet Maps', '/index/maps/leafletmaps', null, 'my_location',
           null, false, 66),
  new Menu(81, 'Drag & Drop', '/index/drag-drop', null, 'mouse', null, false,
           3),
  new Menu(85, 'Material Icons', '/index/icons', null, 'insert_emoticon', null,
           false, 3),
  new Menu(40, 'Pages', null, null, 'library_books', null, true, 0),
  new Menu(43, 'Login', '/login', null, 'exit_to_app', null, false, 40),
  new Menu(44, 'Register', '/register', null, 'person_add', null, false, 40),
  new Menu(45, 'Blank', '/blank', null, 'check_box_outline_blank', null, false,
           40),
  new Menu(46, 'Page Not Found', '/pagenotfound', null, 'error_outline', null,
           false, 40),
  new Menu(47, 'Error', '/error', null, 'warning', null, false, 40),
  new Menu(49, 'Profile', null, null, 'person', null, true, 40),
  new Menu(50, 'Projects', '/index/profile/projects', null, 'note', null, false,
           49),
  new Menu(51, 'User Info', '/index/profile/user-info', null,
           'perm_contact_calendar', null, false, 49),
  new Menu(55, 'Schedule', '/index/schedule', null, 'event', null, false, 40),
  new Menu(200, 'External Link', null, 'http://themeseason.com', 'open_in_new',
           '_blank', false, 40)
];
