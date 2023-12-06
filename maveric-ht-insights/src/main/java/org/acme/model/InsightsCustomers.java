package org.acme.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.acme.enums.Type;



@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "insights_customers")
public class InsightsCustomers {

    @Id
    @GeneratedValue
    public Long id;
    @Column(nullable = false)
    public String year;
    @Column(nullable = false)
    public String month;
    @Column(name="customer_id",nullable = false)
    public Long customerId;
    @Column(nullable = false)
    public String city;
    @Column(name="created_at",nullable = false)
    public String createdAt;
    @Enumerated(EnumType.STRING)
    public Type type;
}
