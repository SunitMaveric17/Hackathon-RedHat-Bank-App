package org.acme.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.model.InsightsCustomers;


@ApplicationScoped
public class InsightsCustomerRepository implements PanacheRepository<InsightsCustomers> {

}
