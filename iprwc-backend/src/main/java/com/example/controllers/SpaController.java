package com.example.controllers;

@RestController
@Controller
public class SpaController {

    @RequestMapping(value = {"/{path:^(?!api|static|assets|.*\\..*$).*$}/**"})
    public String forward() {
        return "forward:/index.html";
    }
}