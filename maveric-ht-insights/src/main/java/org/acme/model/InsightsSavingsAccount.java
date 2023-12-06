package org.acme.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.acme.enums.InterestCompoundingPeriod;
import org.acme.enums.Type;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "insights_savings_account")
public class InsightsSavingsAccount {

    @Id
    @GeneratedValue
    Long id;

    @Column(name = "savings_account_id", nullable = false)
    Long savingsAccountId;

    @Column(nullable = false)
    String status;

    @Column(name="customer_id",nullable = false)
    Long customerId;

    @Column(name="min_opening_balance",nullable = false)
    BigDecimal minOpeningBalance;

    @Enumerated(EnumType.STRING)
    @Column(name="interest_compounding_period",nullable = false)
    InterestCompoundingPeriod interestCompoundingPeriod;

    @Column(name="allow_over_draft",nullable = false)
    Boolean allowOverDraft;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Type type;

    @Column(name="created_at",nullable = false)
    String createdAt;

    @Column(nullable = false)
    String city;
}
