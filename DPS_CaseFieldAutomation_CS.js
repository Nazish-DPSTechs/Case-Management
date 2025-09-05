/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/record'], function(currentRecord, record) {
    function fieldChanged(context) {
        var rec = context.currentRecord;
        if (context.fieldId === 'custcase_category') {
            var category = rec.getValue('custcase_category');
            // Example: Set default SLA based on category
            if (category === 'Technical') {
                var today = new Date();
                today.setDate(today.getDate() + 2); // 2-day SLA
                rec.setValue({ fieldId: 'custcase_sla_duedate', value: today });
            }
        }
    }
    return {
        fieldChanged: fieldChanged
    };
});
