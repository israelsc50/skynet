angular.module('moduleTareas', ['ui.router', 'ngMaterial', 'ngMdIcons'])
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) { 
        $stateProvider
            .state('alta', {
                url: '/alta',
                templateUrl: 'views/tareas/add.html',
                controller: 'ctrlAlta'
            })
            .state('editar', {
                url: '/editar',
                templateUrl: 'views/tareas/detail.html',
                controller: 'ctrlEditar'
            })
            .state('editarTarea', {
                url: '/editarTarea',
                templateUrl: 'views/tareas/editarTarea.html',
                controller: 'ctrlEditarTarea'
            })
            .state('usuarioTarea', {
                url: '/usuarioTarea',
                templateUrl: 'views/tareas/usuarioTarea.html',
                controller: 'ctrlUsuarioTarea'
            })
            .state('prueba1', {
                url: '/prueba1',
                templateUrl: 'views/tareas/prueba1.html',
                controller: 'ContactChipDemoCtrl as ctrl'
            })
            .state('dashboard ', {
                url: '/dashboard',
                templateUrl: 'views/tareas/dashboard.html',
                controller: 'ctrlDashboard'
            });

        $urlRouterProvider.otherwise('alta');


        //Diseño del Material Design
        var customBlueMap =       $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });

        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default': '500',
                'hue-1': '50'
        })

        .accentPalette('pink');
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey')


    })
    .factory('comun', function($http, $q) {
        var comun = {};

        comun.tareas = [];

        comun.tarea = {};

        comun.misTareas = [];  //Utilizado en el Metodo ---- getAllOfUser
        comun.tareasEnEspera = [];  //
        comun.tareasEnProceso = [];  //
        comun.tareasEnPausa = [];  //
        comun.tareasTerminadas = [];  //
        comun.tareasCanceladas = [];  //
        comun.proyectos = [];  //

        comun.usuarios = [];  //Obtiene todos los usuarios

        comun.menusDinamicos = [];  //Utilizado en el Metodo ---- getAllMenus


 



        /***Sección de métodos remotos***/
        comun.getAll = function(){
            return $http.get('tareas/tareas')
            .success(function(data){
                angular.copy(data, comun.tareas)

                return comun.tareas
            })
        } 

         comun.getAllOfUser = function(){
            return $http.get('tareas/misTareas')
            .success(function(data){
                angular.copy(data, comun.misTareas) //SOLO ACEPTA ARREGLOS MUCHO OJO!!!!!!!!

                return comun.misTareas
            })
        } 

        comun.getAllEnEspera = function(){
            return $http.get('tareas/tareasEnEspera')
            .success(function(data){
                angular.copy(data, comun.tareasEnEspera) 

                return comun.tareasEnEspera
            })
        } 
        comun.getAllEnProceso = function(){
            return $http.get('tareas/tareasEnProceso')
            .success(function(data){
                angular.copy(data, comun.tareasEnProceso) 

                return comun.tareasEnProceso
            })
        }    

        comun.getAllEnPausa = function(){
            return $http.get('tareas/tareasEnPausa')
            .success(function(data){
                angular.copy(data, comun.tareasEnPausa) 

                return comun.tareasEnPausa
            })
        }    

       comun.getAllTerminadas = function(){
            return $http.get('tareas/tareasTerminadas')
            .success(function(data){
                angular.copy(data, comun.tareasTerminadas) 

                return comun.tareasTerminadas
            })
        }  

        comun.getAllCanceladas = function(){
            return $http.get('tareas/tareasCanceladas')
            .success(function(data){
                angular.copy(data, comun.tareasCanceladas) 
                
                return comun.tareasCanceladas
            })
        } 

        comun.getAllMenus = function(){
            return $http.get('tareas/getAllMenus')
            .success(function(data){
                angular.copy(data, comun.menusDinamicos) //SOLO ACEPTA ARREGLOS MUCHO OJO!!!!!!!!

                return comun.menusDinamicos
            })
        }

        comun.getAllUsers = function(){
            return $http.get('tareas/usuarios')
            .success(function(data){
                angular.copy(data, comun.usuarios) //SOLO ACEPTA ARREGLOS MUCHO OJO!!!!!!!!
                return comun.usuarios
            })
        } 

        comun.getAllUsersForFind = function(){
            var defered = $q.defer();
            comun.usuarios = defered.promise;
            return $http.get('tareas/usuarios')
            .success(function(data){
                //angular.copy(data, comun.usuarios) //SOLO ACEPTA ARREGLOS MUCHO OJO!!!!!!!!
                defered.resolve(data);
                return comun.usuarios
            })
        } 


        comun.getAllProyectos = function(){
           
            return $http.get('tareas/proyectos')
            .success(function(data){
                angular.copy(data, comun.proyectos) //SOLO ACEPTA ARREGLOS MUCHO OJO!!!!!!!!

                return comun.proyectos
            })
        } 

        comun.add = function(tarea){
           return $http.post('tareas/tarea', tarea)
            .success(function(tarea){
                comun.tareas.push(tarea);
                comun.misTareas.push(tarea);
            })
        }

        comun.update = function(tarea){
            console.log(tarea);
            return $http.put('tareas/tarea/' + tarea._id, tarea)
            .success(function(data){
                var indice = comun.tareas.indexOf(tarea);
                comun.tareas[indice] = data;
            })
        }

        comun.delete = function(tarea){
            return $http.delete('tareas/tarea/' + tarea._id)
            .success(function(){
                var indice = comun.tareas.indexOf(tarea);
                comun.tareas.splice(indice, 1);
            })
        }

        return comun;
    })
    .controller('ctrlAlta', function($scope, $state, comun) {
        $scope.tarea = {}
            // $scope.tareas = [];

        comun.getAll();

        $scope.tareas = comun.tareas;

        $scope.prioridades = ['Baja', 'Normal', 'Alta'];

        $scope.agregar = function() {
            comun.add({
                nombre: $scope.tarea.nombre,
                descripcion: $scope.tarea.descripcion,
                prioridad: parseInt($scope.tarea.prioridad)
            })

            $scope.tarea.descripcion = '';
            $scope.tarea.nombre = '';
            $scope.tarea.prioridad = '';
        }

        $scope.masPrioridad = function(tarea) {
            tarea.prioridad += 1;
        }

        $scope.menosPrioridad = function(tarea) {
            tarea.prioridad -= 1;
        }

        $scope.eliminar = function(tarea) {
            comun.delete(tarea);
        }

        $scope.procesaObjeto = function(tarea) {
            comun.tarea = tarea;
            $state.go('editar');
        }

    })
    .controller('ctrlEditar', function($scope, $state, comun) {
        $scope.tarea = comun.tarea;
        
        $scope.actualizar = function() {
            comun.update($scope.tarea);
            $state.go('alta');
        }

        $scope.eliminar = function(){
            comun.delete($scope.tarea);
            $state.go('alta');
        }
    })  


    .controller('ctrlEditarTarea', function($scope, $state, comun) {
        $scope.tarea = comun.tarea;
        

          //Actualizar Registro
          $scope.actualizar = function(){
            comun.update($scope.tarea);
            //$state.go('alta');
          }

        $scope.eliminar = function(){
            comun.delete($scope.tarea);
            $state.go('alta');
        }
    })

    .controller('ctrlUsuarioTarea', function($scope, $state, comun) {
      $scope.tarea = comun.tarea;

      $scope.usuarios = {};
      comun.getAllUsers();
      $scope.usuarios = comun.usuarios;


      $scope.proyectos = {};
      comun.getAllProyectos();
      $scope.proyectos = comun.proyectos;
      console.log($scope.proyectos );
        //Actualizar Regiastro
        $scope.actualizar = function(){
          comun.update($scope.tarea);
          // $state.go('alta');
        }

      //$scope.tarea.usuariosAsignados.push(JSON.parse('{"id": "'+$scope.authentication.user._id+'" , "nombre": "'+$scope.authentication.user.username+'" }'));

    })

    .controller('ContactChipDemoCtrl', function($scope, $state, comun, $timeout, $q) {

      $scope.users = {};
        comun.getAllUsersForFind().then(function(data){
          initFindUser(data);
        });
        usuarios= comun.usuarios;
        //console.log(usuarios.then);

        var self = this;



        function initFindUser(data){

          self.querySearch = querySearch;
          self.allContacts = loadContacts(data);

          self.contacts = [self.allContacts[0]];
          self.filterSelected = true;
          //console.log(data);
        }
        //$scope.users = comun.usuarios;
        
        
        //console.log(usuarios.length);
        for (var i = 0; i <  usuarios.length; i++) {
          console.log(usuarios[i].username);
          arrUsuario.push(usuarios[i].username + " "+usuarios[i]._id);
        };
        //console.log("arrUsuario",arrUsuario);

        //console.log(,usuarios);
        /**
         * Search for contacts.
         */
        function querySearch (query) {
          var results = query ?
              self.allContacts.filter(createFilterFor(query)) : [];
          return results;
        }

      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(contact) {
          return (contact._lowername.indexOf(lowercaseQuery) != -1);;
        };

      }

      function loadContacts(data) {
        var arrUsuario = [];
        datos = data.data;
        //console.log(data.data.length);
        for (var i = 0; i <  datos.length; i++) {
          //console.log(datos[i].username);
          arrUsuario.push(datos[i].username + " "+datos[i]._id);
        };


        return arrUsuario.map(function (c, index) {
           var cParts = c.split(' ');
           console.log(cParts);
           var nombre = cParts[0];

           //console.log(nombre);
           var contact = {
             id: cParts[1],
             name: nombre,
             //email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
             image: 'http://lorempixel.com/50/50/people?' + index
           };
           contact._lowername = contact.name.toLowerCase();
           return contact;
         });

        console.log(arrUsuario);
        var contacts = [
          'Marina Augustine',
          'Oddr Sarno',
          'Nick Giannopoulos',
          'Narayana Garner',
          'Anita Gros',
          'Megan Smith',
          'Tsvetko Metzger',
          'Hector Simek',
          'Some-guy withalongalastaname'
        ];

        return contacts.map(function (c, index) {
          var cParts = c.split(' ');
          var contact = {
            name: c,
            email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
            image: 'http://lorempixel.com/50/50/people?' + index
          };
          contact._lowername = contact.name.toLowerCase();
          return contact;
        });
      }


    })

    .controller('ctrlDashboard', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$state', 'comun', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $state, comun){ //Comun agregado por Israel
      $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
      };
          $scope.tarea = {};
          $scope.prioridades = ['Baja', 'Normal', 'Alta'];
          $scope.tipos = ['Planificada', 'Mejora', 'Corrección'];
          $scope.estado = ['En Espera', 'En Proceso', 'En Pausa', 'Terminada', 'Cancelada'];


          $scope.agregar = function() {
            comun.add({
                nombre: $scope.tarea.nombre,
                descripcion: $scope.tarea.descripcion,
                prioridad: parseInt($scope.tarea.prioridad)
            })

            $scope.tarea.nombre = '';
            $scope.tarea.prioridad = '';
        }




        $scope.masPrioridad = function(tarea) {
            tarea.prioridad += 1;
        }

        $scope.menosPrioridad = function(tarea) {
            tarea.prioridad -= 1;
        }

        $scope.eliminar = function(tarea) {
            comun.delete(tarea);
        }

/*        $scope.menu = [
        {
          link : '',
          title: 'Dashboard',
          icon: 'dashboard'
        },
        {
          link : '',
          title: 'Friends',
          icon: 'group'
        },
        {
          link : '',
          title: 'Messages',
          icon: 'message'
        }
      ];*/
      $scope.admin = [
        {
          link : '',
          title: 'Desconectar',
          icon: 'delete'
        },
        {
          link : 'showListBottomSheet($event)',
          title: 'Settings',
          icon: 'settings'
        }
      ];
      //Menu DINAMICO OBTENEMOS TODOS LOS MENUS DE LA BASE DE DATOS
      $scope.menusDinamicos = {};
      comun.getAllMenus();
      $scope.menusDinamicos = comun.menusDinamicos;

      // Ya no esta en uso.
      $scope.activity = [
          {
            what: 'Brunch this weekend?',
            who: 'Ali Conners',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
          {
            what: 'Summer BBQ',
            who: 'to Alex, Scott, Jennifer',
            when: '3:08PM',
            notes: "Wish I could come out but I'm out of town this weekend"
          },
          {
            what: 'Oui Oui',
            who: 'Sandra Adams',
            when: '3:08PM',
            notes: "Do you have Paris recommendations? Have you ever been?"
          },
          {
            what: 'Birthday Gift',
            who: 'Trevor Hansen',
            when: '3:08PM',
            notes: "Have any ideas of what we should get Heidi for her birthday?"
          },
          {
            what: 'Recipe to try',
            who: 'Brian Holt',
            when: '3:08PM',
            notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
          },
        ];
      //Metodo para obtener todas las tareas del usuario logeado.
      $scope.misTareas = {}
      comun.getAllOfUser();
      $scope.misTareas = comun.misTareas;
      
      //Metodo para obtener todas las tareas
      $scope.tarea = {}
      comun.getAll();

      $scope.tareas = comun.tareas;

      //Metodo para obtener tareas con STATUS - EN ESPERA
      $scope.tareaEnEspera = {}
      comun.getAllEnEspera();
      $scope.tareaEnEspera = comun.tareasEnEspera;

      //Metodo para obtener tareas con STATUS - EN PROCESO

      $scope.tareasEnProceso = {}
      comun.getAllEnProceso();
      $scope.tareasEnProceso = comun.tareasEnProceso;


      $scope.tareasEnPausa = {}
      comun.getAllEnPausa();
      $scope.tareasEnPausa = comun.tareasEnPausa;


      $scope.tareasTerminadas = {}
      comun.getAllTerminadas();
      $scope.tareasTerminadas = comun.tareasTerminadas;


      $scope.tareasCanceladas = {}
      comun.getAllCanceladas();
      $scope.tareasCanceladas = comun.tareasCanceladas;

      //Fin de los metodos implementados para obtener la información



      //
      $scope.alert = '';
      $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
          controller: 'ListBottomSheetCtrl',
          targetEvent: $event
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };

      //Editar tarea
      $scope.editarTarea = function(tarea) {
          comun.tarea = tarea;
          $state.go('editarTarea');
          //$scope.showAdd();
      }

      $scope.usuarioTarea = function(tarea){
          comun.tarea = tarea;
          $state.go('usuarioTarea');
      }

      
      $scope.showAdd = function(ev) {
        $scope.tarea = comun.tarea;
        console.log($scope.tarea);
        //$scope.myDate = new Date();
        $mdDialog.show({
          controller: DialogController,
          templateUrl : 'views/tareas/formularioTareas.html',
          //template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
          targetEvent: ev,
        })
        .then(function(answer) {
          //alert("Hola Mundo");
           //$scope.agregar();
          $scope.alert = 'You said the information was "' + answer + '".';
        }, function() { //Si cancelamos forzado el Dialog nos manda a esta otra función
          console.log("TAN ???");
          $scope.alert = 'You cancelled the dialog.';
        });
      };
    }])

    .controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
      $scope.items = [
        { name: 'Share', icon: 'share' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
      ];
      
      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    })


    .directive('userAvatar', function() {
        return {
            replace: true,
            template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
             //templateUrl : 'views/tareas/components/controlButtons.html',
        };
    })

    function DialogController($scope, $mdDialog, comun) {
      $scope.tarea = {}
        $scope.agregarTarea = function(){
          console.log($scope.tarea);
            comun.add({
                nombre: $scope.tarea.nombre,
                descripcion: $scope.tarea.descripcion,
                tipo: parseInt($scope.tarea.tipo),
                prioridad: parseInt($scope.tarea.prioridad),
                fecha_termino: $scope.tarea.fecha_termino,
                fecha_entrega: $scope.tarea.fecha_entrega,
                status: parseInt($scope.tarea.status),
            })



              $scope.tarea.nombre = '';
              $scope.tarea.descripcion = '';
              $scope.tarea.tipo = '';
              $scope.tarea.prioridad = '';
              $scope.tarea.fecha_termino = '';
              $scope.tarea.fecha_termino = '';
              $scope.tarea.fecha_entrega = '';
              $scope.tarea.status = '';

             $mdDialog.hide();
            
        }

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }











/*app.controller('AppCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
    $scope.menu = [
    {
      link : '',
      title: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link : '',
      title: 'Friends',
      icon: 'group'
    },
    {
      link : '',
      title: 'Messages',
      icon: 'message'
    }
  ];
  $scope.admin = [
    {
      link : '',
      title: 'Trash',
      icon: 'delete'
    },
    {
      link : 'showListBottomSheet($event)',
      title: 'Settings',
      icon: 'settings'
    }
  ];
  $scope.activity = [
      {
        what: 'Brunch this weekend?',
        who: 'Ali Conners',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Summer BBQ',
        who: 'to Alex, Scott, Jennifer',
        when: '3:08PM',
        notes: "Wish I could come out but I'm out of town this weekend"
      },
      {
        what: 'Oui Oui',
        who: 'Sandra Adams',
        when: '3:08PM',
        notes: "Do you have Paris recommendations? Have you ever been?"
      },
      {
        what: 'Birthday Gift',
        who: 'Trevor Hansen',
        when: '3:08PM',
        notes: "Have any ideas of what we should get Heidi for her birthday?"
      },
      {
        what: 'Recipe to try',
        who: 'Brian Holt',
        when: '3:08PM',
        notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
      },
    ];
  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
  
  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
}]);

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];
  
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};

app.directive('userAvatar', function() {
  return {
    replace: true,
    template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
  };
});

app.config(function($mdThemingProvider) {
  var customBlueMap =       $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});
*/
