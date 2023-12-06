package org.acme.utils;

import io.quarkus.kafka.client.serialization.ObjectMapperDeserializer;
import org.acme.dtos.KafkaRequestDto;
import org.acme.model.InsightsCustomers;

public class KafkaRequestDeserializer extends ObjectMapperDeserializer<KafkaRequestDto> {
    public KafkaRequestDeserializer() {
        super(KafkaRequestDto.class);
    }
}