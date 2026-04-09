try {
    var r = new sn_ws.RESTMessageV2('ColdFusionApp', 'default_get'); // Alias name
    r.setStringParameterNoEscape('table_name', 'incident');

    var response = r.execute();
    var responseBody = response.getBody();
    var httpStatus = response.getStatusCode();
} catch (ex) {
    var message = ex.message;
}
