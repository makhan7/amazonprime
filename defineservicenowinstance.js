<cfscript>
    // 1. Define ServiceNow Instance Details
    snInstance = "https://service-now.com";
    apiEndpoint = "/api/now/table/incident";
    
    // 2. Prepare Authentication (Base64 Encode: username:password)
    username = "your_service_account";
    password = "your_password";
    authHeader = "Basic " & ToBase64("#username#:#password#");

    // 3. Define the Incident Data (JSON)
    incidentData = {
        "short_description": "Server Down - Reported via ColdFusion",
        "description": "High memory usage detected on the web server.",
        "urgency": "1",
        "impact": "1"
    };

    // 4. Send the Request
    httpService = new http();
    httpService.setMethod("post");
    httpService.setUrl(snInstance & apiEndpoint);
    httpService.addParam(type="header", name="Authorization", value=authHeader);
    httpService.addParam(type="header", name="Content-Type", value="application/json");
    httpService.addParam(type="body", value=serializeJSON(incidentData));

    response = httpService.send().getPrefix();

    // 5. Output the result
    if (response.status_code == 201) {
        writeOutput("Incident created successfully!");
        writeDump(deserializeJSON(response.fileContent));
    } else {
        writeOutput("Error: " & response.status_code);
    }
</cfscript>
