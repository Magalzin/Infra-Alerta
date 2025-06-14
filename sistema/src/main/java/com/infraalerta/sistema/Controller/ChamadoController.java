package com.infraalerta.sistema.Controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.infraalerta.sistema.Model.Chamado;
import com.infraalerta.sistema.Service.ChamadoService;

@RestController
@RequestMapping("/chamados")
@CrossOrigin(origins = "*")
public class ChamadoController {

    @Autowired
    private ChamadoService service;

    @GetMapping
    public ResponseEntity<List<Chamado>> getChamados() {
        List<Chamado> list = service.getAllChamados();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping("/criar")
    public ResponseEntity<Chamado> createChamado(@RequestBody Chamado chamado) {
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(chamado.getId())
                .toUri();
        Chamado response = service.createChamado(chamado);
        return ResponseEntity.created(uri).body(response);
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<Chamado> likeInChamado(@PathVariable Long id) {
        Chamado chamado = service.likeInChamado(id);
        return ResponseEntity.ok().body(chamado);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Chamado> atualizarChamado(@PathVariable Long id, @RequestBody Chamado chamado) {
        Chamado chamadoUpdated = service.updateChamado(id, chamado);
        return ResponseEntity.ok(chamadoUpdated);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletarChamado(@PathVariable Long id){
        service.deleteChamado(id);
        return ResponseEntity.ok().build();
    }

}
