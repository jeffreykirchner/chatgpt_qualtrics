send_chat: function send_chat(){

    if(app.working) return;
    if(app.chat_text.trim() == "") return;
    if(app.chat_text.trim().length > 100) return;

    let chat_bubble_sprite = PIXI.Sprite.from(app.pixi_textures.sprite_sheet_2.textures["chat_bubble.png"]);
    let style = new PIXI.TextStyle({fontFamily : 'Arial',
                                    fontSize: 18, 
                                    fill :0x000000, 
                                    align : 'left',
                                    wordWrap: true,
                                    wordWrapWidth: chat_bubble_sprite.width-25,
                                    breakWords: true})
    const textMetrics = PIXI.CanvasTextMetrics.measureText(app.chat_text.trim(), style)

    let chat_text_processed ="";

    for(let i=0; i<textMetrics.lines.length; i++)
    {
        chat_text_processed += textMetrics.lines[i];

        if(i==5 || i==textMetrics.lines.length-1) break;

        chat_text_processed += "\n";
    }

    if(textMetrics.lines.length > 6)
    {
        chat_text_processed += "...";
    }

    if(app.session.world_state.current_experiment_phase == 'Instructions')
    {

        if(app.session_player.current_instruction == app.instructions.action_page_3)
        {
            if(app.session_player.current_instruction_complete < app.instructions.action_page_3)
            {
                app.session_player.current_instruction_complete = app.instructions.action_page_3;
                app.send_current_instruction_complete();
            }
        }
            
        app.send_chat_instructions(chat_text_processed);
    }
    else
    {
        app.working = true;
        app.send_message("chat", 
                        {"text" : chat_text_processed,
                        "current_location" : app.session.world_state.session_players[app.session_player.id].current_location,},
                        "group");
    }
    
    app.chat_text = "";       
                   
},

