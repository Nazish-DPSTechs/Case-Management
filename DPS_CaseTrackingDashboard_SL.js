/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/search'], function(ui, search) {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            var form = ui.createForm({ title: 'Case Management Dashboard' });
            var sublist = form.addSublist({ id: 'custpage_cases', type: ui.SublistType.LIST, label: 'Open Cases' });

            sublist.addField({ id: 'custpage_case_number', type: ui.FieldType.TEXT, label: 'Case Number' });
            sublist.addField({ id: 'custpage_customer', type: ui.FieldType.TEXT, label: 'Customer' });
            sublist.addField({ id: 'custpage_category', type: ui.FieldType.TEXT, label: 'Category' });
            sublist.addField({ id: 'custpage_status', type: ui.FieldType.TEXT, label: 'Status' });

            var caseSearch = search.create({
                type: 'supportcase',
                filters: [['status', 'anyof', 'Open']],
                columns: ['tranid', 'entity', 'custevent_case_category', 'status']
            });

            var i = 0;
            caseSearch.run().each(function(result) {
                sublist.setSublistValue({ id: 'custpage_case_number', line: i, value: result.getValue('tranid') });
                sublist.setSublistValue({ id: 'custpage_customer', line: i, value: result.getText('entity') });
                sublist.setSublistValue({ id: 'custpage_category', line: i, value: result.getText('custevent_case_category') });
                sublist.setSublistValue({ id: 'custpage_status', line: i, value: result.getText('status') });
                i++;
                return true;
            });

            context.response.writePage(form);
        }
    }
    return { onRequest: onRequest };
});