/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var events = [{slug: "How to pass class",
                body: "Come to class"}];
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.loadTemplates();
        app.render('container');
        app.registerCallbacks();
    },
    loadTemplates: function(){
      var templateText = document.getElementById('entries');

      app.entriesTemplate = new EJS({text: templateText});

      var addEntryFormTemplateText = document.getElementById('addEntryForm');

      app.addEntryFormTemplate = new EJS({text: addEntryFormTemplateText});
    },
    registerCallbacks: function(){
      $('#entryForm').hide();
      $('#addEntry').on('click', function(){
        $('#entryForm').show();
      });
      $('#submit').on('click', app.addEntry);
    },
    addEntry: function(evt){
      evt.preventDefault();

      var slug = $('#slug').val();
      var body = $('#body').val();

      var entry = {slug: slug, body: body};

      events.push(entry);

      app.render("container");

      $('#entryForm').hide();
    },
    // Update DOM on a Received Event
    render: function(id) {
      var containerElement = document.getElementById(id);

      var html = app.entriesTemplate.render({events: events});

      containerElement.innerHTML = html;

      var form = app.addEntryFormTemplate.render();

      $('#container').append(form);

      $(".delete").on('click', function(evt){
        console.log("Delete" + evt);
        var entryID = $(this).attr('data-id');
        console.log( entryID );
        events.splice(entryID, 1);
        app.render('container');
      });
    }
};

app.initialize();
