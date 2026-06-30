package com.querymind.repository;

import com.querymind.entity.SavedQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedQueryRepository extends JpaRepository<SavedQuery, Long> {
}