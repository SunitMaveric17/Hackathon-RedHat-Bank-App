package org.acme.dtos;

import lombok.Data;
import org.acme.enums.Type;
import org.acme.model.InsightsLoans;

@Data
public class KafkaRequestDto {
    public Type type;
	public Object  message;
}
