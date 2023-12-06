package org.acme.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.acme.enums.Type;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "event_logs")
public class EventLog {

	@Id
	@GeneratedValue
	private  Long id;
	
	@Column(nullable = false)
	private Type type;
	
	@Column(nullable = false)
	private String message;
	
	@Column(name="created_at",nullable = false)
	private Instant createdAt;

}
