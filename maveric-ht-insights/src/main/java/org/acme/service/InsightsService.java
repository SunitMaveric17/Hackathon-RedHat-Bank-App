package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.acme.enums.Type;
import org.acme.model.InsightsCustomers;
import org.acme.model.InsightsLoans;
import org.acme.model.InsightsSavingsAccount;
import org.acme.repository.InsightsCustomerRepository;
import org.acme.repository.InsightsLoansRepository;
import org.acme.repository.InsightsSavingsAccountRepository;
import org.jboss.logging.Logger;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author ankushk
 */

@ApplicationScoped
@Slf4j
public class InsightsService {

    @Inject
    InsightsLoansRepository insightsLoansRepository;

    @Inject
    InsightsCustomerRepository insightsCustomerRepository;

    @Inject
    InsightsSavingsAccountRepository insightsSavingsAccountRepository;

    @Transactional
    public Map<String, Long> getCustomerCountByMonth(int year) {
        try {
            log.info("getCustomerCountByMonth service called");
            List<InsightsCustomers> customers = insightsCustomerRepository.list("year", year);

            Map<String, Long> customerCountByMonth = customers.stream()
                    .filter(customer -> Type.CUSTOMER_CREATED.equals(customer.type))
                    .collect(Collectors.groupingBy(InsightsCustomers::getMonth, Collectors.counting()));

            List<String> orderedMonths = Arrays.asList(
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
            );

            Map<String, Long> sortedCustomerCountByMonth = new LinkedHashMap<>();
            orderedMonths.forEach(month -> sortedCustomerCountByMonth.put(month, customerCountByMonth.getOrDefault(month, 0L)));

            return sortedCustomerCountByMonth;
        } catch (Exception e) {
            log.error("An error occurred in getCustomerCountByMonth", e);
            throw new RuntimeException("Error in getCustomerCountByMonth", e);
        }
    }

    @Transactional
    public double calculateTotalSavingsAccountPercentageForCity(String selectedCity) {
        log.info("Calculating percentage for city: " + selectedCity);

        if (selectedCity == null) {
            log.info("City is null. Returning 0.0");
            return 0.0;
        }

        List<InsightsSavingsAccount> allSavingAccounts = insightsSavingsAccountRepository.listAll();
        int totalCustomers = allSavingAccounts.size();
        log.info("Total customers: " + totalCustomers);

        if (totalCustomers == 0) {
            log.info("No customer data available. Returning 0.0");
            return 0.0;
        }

        long savingsAccountCountForCity = allSavingAccounts.stream()
                .filter(account ->
                        selectedCity.trim().equalsIgnoreCase(account.getCity().trim()))
                .count();

        log.info("Savings account count for city: " + savingsAccountCountForCity);

        double percentage = ((double) savingsAccountCountForCity / totalCustomers) * 100.0;
        log.info("Percentage calculated: " + percentage);
        return percentage;
    }

    @Transactional
    public Map<String, Long> countLoansProductByMonth(int year) {

        log.info("Inside loan service call");
        Map<String, Long> result = new LinkedHashMap<>();

        String[] monthNames = new String[]{
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        };

        for (String monthName : monthNames) {
            result.put(monthName, 0L);
        }

        List<InsightsLoans> loansProductCounts = insightsLoansRepository.list("year = ?1", year);

        for (InsightsLoans loansProductCount : loansProductCounts) {
            String monthName = getMonthName(loansProductCount.getMonth());

            result.put(monthName, result.get(monthName) + 1);
        }

        return result;
    }
    private String getMonthName(int month) {
        String[] monthNames = new String[]{
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        };

        if (month >= 1 && month <= 12) {
            return monthNames[month - 1];
        } else {
            return "Invalid Month";
        }
    }
}
