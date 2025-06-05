package com.infraalerta.sistema.Controller;

import com.infraalerta.sistema.Model.Chamado;
import com.infraalerta.sistema.Service.ChamadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/chamados")
@CrossOrigin(origins = "*")
public class ChamadoController {

    @Autowired
    private ChamadoService service;

    @GetMapping
    public ResponseEntity<List<Chamado>> getChamados(){
        List<Chamado> list = service.getAllChamados();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping("/criar")
    public ResponseEntity<Chamado> createChamado(@RequestBody Chamado chamado){
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(chamado.getId())
                .toUri();
        Chamado response = service.createChamado(chamado);
        return ResponseEntity.created(uri).body(response);
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<Chamado> likeInChamado(@PathVariable Long id){
        Chamado chamado = service.likeInChamado(id);
        return ResponseEntity.ok().body(chamado);
    }

}
