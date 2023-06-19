sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("campeonatobrasileiro.controller.Main", {

				onInit: function () {

				// var dadosGerais = { 
				// 	rodada : '10a',
				// 	campeonato : "Projeto Brasileirão 2023" 
				// };

				// var dadosModel = new JSONModel();
				// dadosModel.setData(dadosGerais);
				// var view = this.getView();
				// view.setModel(dadosModel,"ModeloDadosGerais");
				
				// Objetos vazios
				var dadosGerais = {};
				var classificacao = {};
				var partidas = {};

				// Modelos vazios
				// Variável dentro do parênteses substitui o comando setData.
				var dadosModel = new JSONModel(dadosGerais);
				var classificacaoModel = new JSONModel(classificacao);
				var partidasModel = new JSONModel(partidas);

				// Atribuir 3 modelos a view
				this.getView().setModel(dadosModel,"ModeloDadosGerais");
				this.getView().setModel(classificacaoModel,"ModeloClassificacao");
				this.getView().setModel(partidasModel,"ModeloPartidas");		
				
				this.buscarDadosGerais();
				this.buscarClassificacao();
				this.buscarPartidas();

				},
				
				buscarDadosGerais : function(){

					// Obter o model
					var dadosModel2 = this.getView().getModel("ModeloDadosGerais");
					
					const configuracoes = {
						url : "https://api.api-futebol.com.br/v1/campeonatos/10",
						method : "GET",
						async : true,
						crossDomain : true,
						headers : {
							"Authorization" : "Bearer live_9f5ae7d63efe0e456681e61b4ec248"
						}
					};

					// Chamada a api
					$.ajax(configuracoes)
					
					.done(function(resposta){

						dadosModel2.setData(resposta);
						this.buscarPartidas(resposta.rodada_atual.rodada);
					// o conteúdo desta função passa a reconhecer a anterior
					}.bind(this))
					
					.fail(function(erro){
						
					});
				},

				buscarClassificacao : function(){

					// Obter o model
					var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");
					
					const configuracoes = {
						url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
						method : "GET",
						async : true,
						crossDomain : true,
						headers : {
							"Authorization" : "Bearer live_9f5ae7d63efe0e456681e61b4ec248"
						}
					};

					// Chamada a api
					$.ajax(configuracoes)
					
					.done(function(resposta){
						
						classificacaoModel2.setData({"Classificacao": resposta});

					})
					
					.fail(function(erro){
						
					});
				},
				buscarPartidas : function(rodada){

					// Obter o model
					var partidasModel2 = this.getView().getModel("ModeloPartidas");
					
					const configuracoes = {
						url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
						method : "GET",
						async : true,
						crossDomain : true,
						headers : {
							"Authorization" : "Bearer live_9f5ae7d63efe0e456681e61b4ec248"
						}
					};

					// Chamada a api
					$.ajax(configuracoes)
					
					.done(function(resposta){
						debugger
						partidasModel2.setData(resposta);

					})
					
					.fail(function(erro){
						debugger
					});
				}								
		});
	});
