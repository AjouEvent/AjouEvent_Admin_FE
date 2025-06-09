package com.ajouevent.admin.controller;

import com.ajouevent.admin.domain.EventBanner;
import com.ajouevent.admin.dto.request.EventBannerRequestDto;
import com.ajouevent.admin.dto.response.EventBannerResponse;
import com.ajouevent.admin.service.EventBannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/banners")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class EventBannerController {
    // ... existing code ...
} 