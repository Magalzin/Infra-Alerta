package com.infraalerta.sistema.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infraalerta.sistema.Model.Chamado;
import com.infraalerta.sistema.Repository.ChamadoRepository;

@Service
public class ChamadoService {

    @Autowired
    private ChamadoRepository repository;

    public List<Chamado> getAllChamados() {
        List<Chamado> chamados = repository.findAll();
        chamados.sort((Chamado c1, Chamado c2) -> Integer.compare(c2.getCurtidas(), c1.getCurtidas()));
        return chamados;
    }

    public Chamado createChamado(Chamado chamado) {
        return repository.save(chamado);
    }

    public Optional<Chamado> findChamadoByID(Long id) {
        return repository.findById(id);
    }

    public Chamado likeInChamado(Long id) {
        Optional<Chamado> chamadoOpt = findChamadoByID(id);
        if (chamadoOpt.isPresent()) {
            Chamado chamado = chamadoOpt.get();
            chamado.setCurtidas(chamado.getCurtidas() + 1);
            return repository.save(chamado);
        } else {
            throw new RuntimeException("Chamado não encontrado");
        }
    }

    public Chamado updateChamado(Long id, Chamado dadosAtualizados){
        Optional<Chamado> chamadoOpt = findChamadoByID(id);

        if (chamadoOpt.isPresent()) {
            Chamado chamadoExistente = chamadoOpt.get();
            chamadoExistente.setTitulo(dadosAtualizados.getTitulo());
            chamadoExistente.setDescricao(dadosAtualizados.getDescricao());
            chamadoExistente.setCidade(dadosAtualizados.getCidade());
            chamadoExistente.setBairro(dadosAtualizados.getBairro());
            chamadoExistente.setRua(dadosAtualizados.getRua());

            return repository.save(chamadoExistente);
        } else {
            throw new RuntimeException("Chamado não encontrado");
        }
    }

    public void deleteChamado(Long id){
        Optional<Chamado> chamadoOpt = findChamadoByID(id);
        if (chamadoOpt.isPresent()) {
            Chamado chamadoExistente = chamadoOpt.get();
            
            repository.delete(chamadoExistente);
            
        } else {
            throw new RuntimeException("Chamado não encontrado");
        }
    }
}
