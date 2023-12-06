package org.acme.utils;


import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import org.acme.dtos.ErrorMessage;
import org.acme.dtos.ResponseDTO;


import java.time.Instant;
import java.util.List;

@ApplicationScoped
public class CommonUtil {


    public Response buildFailedResponse(String message, Response.Status status, List<ErrorMessage> errors, Object data, UriInfo uriInfo) {
        ResponseDTO responseDTO = new ResponseDTO("Failed", message, status.getStatusCode(), errors, data, uriInfo.getPath(), Instant.now());
        return Response.status(status).entity(responseDTO).build();
    }

    public Response buildSuccessResponse(String message, Response.Status status,List<ErrorMessage> errors, Object data, UriInfo uriInfo) {
        ResponseDTO responseDTO = new ResponseDTO("Success", message, status.getStatusCode(), errors, data, uriInfo.getPath(), Instant.now());
        return Response.status(status).entity(responseDTO).build();
    }


}
