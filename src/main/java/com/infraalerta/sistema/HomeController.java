package com.infraalerta.sistema;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "InfraAlert.html"; // O Spring vai procurar em /resources/static/
    }
}
