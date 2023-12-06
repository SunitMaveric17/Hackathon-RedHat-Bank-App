package org.acme.utils;

import io.quarkus.kafka.client.serialization.ObjectMapperDeserializer;
import org.acme.model.InsightsCustomers;

public class CustomerDeserializer extends ObjectMapperDeserializer<InsightsCustomers> {
    public CustomerDeserializer() {
        super(InsightsCustomers.class);
    }
}