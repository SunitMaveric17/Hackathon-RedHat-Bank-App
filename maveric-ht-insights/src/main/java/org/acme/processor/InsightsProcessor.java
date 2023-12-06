package org.acme.processor;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.smallrye.common.annotation.Blocking;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.acme.dtos.KafkaRequestDto;
import org.acme.model.EventLog;
import org.acme.model.InsightsCustomers;
import org.acme.model.InsightsLoans;
import org.acme.model.InsightsSavingsAccount;
import org.acme.repository.InsightsCustomerRepository;
import org.acme.repository.InsightsEventLogRepository;
import org.acme.repository.InsightsLoansRepository;
import org.acme.repository.InsightsSavingsAccountRepository;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Outgoing;

import java.time.Instant;

import static org.acme.enums.Type.CUSTOMER_CREATED;
import static org.acme.enums.Type.SAVING_ACCOUNT_CREATED;

/**
 * A bean consuming data from the "test" Kafka topic (mapped to "requests" channel) and giving out a random quote.
 * The result is pushed to the "quotes" Kafka topic.
 */
@Slf4j
@ApplicationScoped
public class InsightsProcessor {
    private InsightsCustomerRepository insightsCustomerRepository;
    private InsightsSavingsAccountRepository insightsSavingsAccountRepository;
    private InsightsLoansRepository insightsLoansRepository;
    private InsightsEventLogRepository insightsEventLogRepository;

    public InsightsProcessor(InsightsCustomerRepository insightsCustomerRepository, InsightsSavingsAccountRepository insightsSavingsAccountRepository, InsightsLoansRepository insightsLoansRepository, InsightsEventLogRepository insightsEventLogRepository) {
        this.insightsCustomerRepository = insightsCustomerRepository;
        this.insightsSavingsAccountRepository = insightsSavingsAccountRepository;
        this.insightsLoansRepository = insightsLoansRepository;
        this.insightsEventLogRepository = insightsEventLogRepository;
    }


//    @Incoming("requests")
//    @Outgoing("quotes")
//    @Blocking
//    public Quote process(String quoteRequest) throws InterruptedException {
//        Log.info("getting req from requests url");
//        Log.info("sending back  data from quotes" +quoteRequest);
//        // simulate some hard working task
//        Thread.sleep(200);
//        return new Quote(quoteRequest, random.nextInt(100));
//    }


//    @Incoming("requests")
//    @Outgoing("quotes")
//    @Blocking
//    public InsightsCustomers getDetailsFromInsight(InsightsCustomers map)
//    {
//        repository.persist(map);
//        Log.info(" sending a data to quates o" +map);
//        return  map;
//    }

    @Incoming("insights-events")
//    @Outgoing("quotes")
    @Blocking
    @Transactional
    public InsightsCustomers getDetailsFromInsight(KafkaRequestDto requestDto) {

        log.info("Request :: " + requestDto);
        ObjectMapper mapper = new ObjectMapper();
        InsightsCustomers customers = null;
        InsightsLoans loans = null;
        InsightsSavingsAccount savingsAccount = null;
        EventLog eventLog = null;
        String jsonString = null;

        try {

            eventLog=new EventLog();
            eventLog.setType(requestDto.type);
            eventLog.setMessage(requestDto.message.toString());
            eventLog.setCreatedAt(Instant.now());
            insightsEventLogRepository.persist(eventLog);
            jsonString = mapper.writeValueAsString(requestDto.message);

            if (requestDto.type == CUSTOMER_CREATED) {
                customers = mapper.readValue(jsonString, InsightsCustomers.class);
                insightsCustomerRepository.persist(customers);
            } else if (requestDto.type == SAVING_ACCOUNT_CREATED) {
                savingsAccount = mapper.readValue(jsonString, InsightsSavingsAccount.class);
                insightsSavingsAccountRepository.persist(savingsAccount);
            } else {
                loans = mapper.readValue(jsonString, InsightsLoans.class);
                insightsLoansRepository.persist(loans);;
            }
        } catch (Exception e) {
            log.error("Not able to upload a data into kafka :: error " + e.getMessage());
        }

        return customers;
    }
}
