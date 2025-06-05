package com.infraalerta.sistema.Model;

import jakarta.persistence.*;

@Entity(name = "Chamado")
public class Chamado {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 60)
    private String titulo;

    @Column(length = 300)
    private String descricao;

    private int curtidas;

    private String cidade;

    private String bairro;

    private String rua;

    public Chamado(String titulo, String descricao, int curtidas, String cidade, String bairro, String rua) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.curtidas = curtidas;
        this.cidade = cidade;
        this.bairro = bairro;
        this.rua = rua;
    }

    public Chamado() {

    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setCurtidas(int curtidas) {
        this.curtidas = curtidas;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public int getCurtidas() {
        return curtidas;
    }

    public String getCidade() {
        return cidade;
    }

    public String getBairro() {
        return bairro;
    }

    public String getRua() {
        return rua;
    }

    public String getDescricao() {
        return descricao;
    }
}
