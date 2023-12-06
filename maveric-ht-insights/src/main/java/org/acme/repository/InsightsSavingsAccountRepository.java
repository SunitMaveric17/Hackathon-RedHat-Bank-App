package org.acme.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.model.InsightsCustomers;
import org.acme.model.InsightsSavingsAccount;


@ApplicationScoped
public class InsightsSavingsAccountRepository implements PanacheRepository<InsightsSavingsAccount> {

}
