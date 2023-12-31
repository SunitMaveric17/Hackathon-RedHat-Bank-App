package org.BankersApp.entity;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.hibernate.validator.constraints.Email;

import java.time.Instant;


/**
 * @author ankushk
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(hidden = true)
    private Long customerId;
    @NotNull
    @Size(min = 3, max = 25)
    private String firstName;
    @NotNull
    @Size(min = 3, max = 25)
    private String lastName;
    @Email(message = "Invalid email address")
    private String email;
    @NotNull
    @Digits(integer = 10, fraction = 0, message = "Phone number must have at most 10 digits")
    private Long phoneNumber;
    @NotNull
    private String city;
    @Schema(hidden = true)
    private Instant createdAt;
    @Schema(hidden = true)
    private Instant modifiedAt;
}
