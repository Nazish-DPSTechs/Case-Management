/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define(['N/record'], function(record) {
    function beforeSubmit(context) {
        var rec = context.newRecord;
        // Example: Auto-generate case code based on customer + category
        var customer = rec.getValue('entity');
        var category = rec.getValue('custcase_category');
        rec.setValue({ fieldId: 'custcase_code', value: customer + '-' + category });
    }
    return {
        beforeSubmit: beforeSubmit
    };
});