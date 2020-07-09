export function deleteItemCtrl($http , directoryStructure , elementHandler , Log , ACIDE) {
    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@deleteItem') ,
        {
            path : elementHandler.getSelectedItemPath() ,
            type : elementHandler.getSelectedItemType()
        }
    ).then(function (response) {
            if(response.data.type === 'success') {
                directoryStructure.refresh();
            }
        } ,
        function (response) {
            Log.report(response);
        });
}