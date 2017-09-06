/**
 * Created by zrz on 2017/4/18.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

// dt的自定义分页功能
module.exports = tableApi=> {
    $('#barcode_list_wrapper').on('keyup paste', '#page_number_value', function (event) {
        let val = $(this).val();
        val = val.replace(/[^0-9]/g, '');
        val = parseInt(val);
        if (event.keyCode === 13) {
            const len = tableApi.page.info().pages;
            if (val <= len && val > 0) {
                tableApi.page(val - 1).draw('page');
            }
        } else {
            $(this).val(val || 1);
        }
    });
};
