package org.acme.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.model.InsightsCustomers;
import org.acme.model.InsightsLoans;


@ApplicationScoped
public class InsightsLoansRepository implements PanacheRepository<InsightsLoans> {

}
