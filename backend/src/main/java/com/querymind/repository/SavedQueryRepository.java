package com.querymind.repository;

import com.querymind.entity.SavedQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedQueryRepository extends JpaRepository<SavedQuery, Long> {
    List<SavedQuery> findByUserIdOrderByCreatedAtDesc(Long userId);
    java.util.Optional<SavedQuery> findByIdAndUserId(Long id, Long userId);
}